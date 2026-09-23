"""QA visual: captura a aplicação rodando por seção e monta lado a lado com a referência.

Contrato: cada seção raiz da página tem `data-section="<slug>"` com os slugs:
  hero, servicos, como-funciona, cta-urgencia, area-de-atendimento,
  sobre, duvidas, cta-final, footer
O recorte "hero" vai do topo da página (inclui o header) até o fim da seção hero,
igual à referência.

Uso:  python qa/compare.py [--url http://localhost:3000] [--only hero,servicos]
Saída: qa/out/{desktop,mobile}-NN-<slug>.png  (esquerda = referência, direita = app)
       + tabela de alturas no stdout.
"""
import argparse, asyncio
from pathlib import Path
from PIL import Image, ImageDraw
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "docs" / "reference" / "baseline"
OUT = ROOT / "qa" / "out"
SLUGS = ["hero", "servicos", "como-funciona", "cta-urgencia", "area-de-atendimento",
         "sobre", "duvidas", "cta-final", "footer"]
DEVICES = {"desktop": 1440, "mobile": 390}


def side_by_side(ref: Path, app: Path, out: Path):
    a, b = Image.open(ref).convert("RGB"), Image.open(app).convert("RGB")
    gap = 24
    canvas = Image.new("RGB", (a.width + b.width + gap, max(a.height, b.height) + 28), "#ff00ff")
    canvas.paste(a, (0, 28)); canvas.paste(b, (a.width + gap, 28))
    d = ImageDraw.Draw(canvas)
    d.text((6, 8), f"REFERENCIA {a.width}x{a.height}", fill="black")
    d.text((a.width + gap + 6, 8), f"APP {b.width}x{b.height}", fill="black")
    canvas.save(out)
    return a.height, b.height


async def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", default="http://localhost:3000")
    ap.add_argument("--only", default="")
    args = ap.parse_args()
    only = [s for s in args.only.split(",") if s] or SLUGS
    OUT.mkdir(parents=True, exist_ok=True)
    rows = []
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for device, width in DEVICES.items():
            page = await browser.new_page(viewport={"width": width, "height": 900})
            errors = []
            page.on("console", lambda m: errors.append(m.text) if m.type in ("error", "warning") else None)
            page.on("pageerror", lambda e: errors.append(str(e)))
            await page.goto(args.url, wait_until="networkidle")
            await page.emulate_media(reduced_motion="reduce")
            await page.evaluate("document.fonts.ready")
            # força carregamento de imagens lazy
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            await page.wait_for_timeout(800)
            await page.evaluate("window.scrollTo(0, 0)")
            await page.wait_for_timeout(300)
            overflow = await page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
            for i, slug in enumerate(SLUGS, 1):
                if slug not in only:
                    continue
                ref = BASE / f"{device}-{i:02d}-{slug}.png"
                el = await page.query_selector(f'[data-section="{slug}"]')
                if not el:
                    rows.append((device, slug, "AUSENTE", "", "")); continue
                box = await page.evaluate(
                    "(el) => { const r = el.getBoundingClientRect(); return {y: r.top + scrollY, h: r.height} }", el)
                y = 0 if slug == "hero" else box["y"]
                h = box["y"] + box["h"] - y
                app_png = OUT / f"_app-{device}-{slug}.png"
                await page.screenshot(path=str(app_png), full_page=True,
                                      clip={"x": 0, "y": y, "width": width, "height": h})
                rh, ah = side_by_side(ref, app_png, OUT / f"{device}-{i:02d}-{slug}.png")
                rows.append((device, slug, rh, ah, ah - rh))
            print(f"[{device}] overflow horizontal: {overflow}px | console: {errors or 'limpo'}")
            await page.close()
        await browser.close()
    print(f"{'device':8} {'secao':22} {'ref':>6} {'app':>6} {'delta':>6}")
    for r in rows:
        print(f"{r[0]:8} {r[1]:22} {str(r[2]):>6} {str(r[3]):>6} {str(r[4]):>6}")


asyncio.run(main())
