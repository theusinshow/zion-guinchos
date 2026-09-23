"""Captura screenshots-base da referência aprovada (v2), por seção, em 1440 e 390.

Uso: python qa/capture_reference.py   (a partir da raiz do projeto)
Saída: docs/reference/baseline/{desktop,mobile}-NN-<secao>.png
"""
import asyncio, functools, http.server, re, threading, unicodedata
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent.parent
REF = ROOT / "docs" / "reference"
OUT = REF / "baseline"
PORT = 8766


def slug(s: str) -> str:
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def serve():
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(REF))
    handler.log_message = lambda *a: None
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    srv = serve()
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 2100, "height": 1000})
        await pg.goto(f"http://127.0.0.1:{PORT}/Zion%20Landing%20Page%20v2.dc.html", wait_until="networkidle")
        await pg.wait_for_timeout(3000)
        els = await pg.query_selector_all("[data-screen-label]")
        counters = {"desktop": 0, "mobile": 0}
        for e in els:
            label = await e.get_attribute("data-screen-label")
            name, _, device = label.partition("·")
            device = "mobile" if "mobile" in device.lower() else "desktop"
            counters[device] += 1
            path = OUT / f"{device}-{counters[device]:02d}-{slug(name)}.png"
            await e.screenshot(path=str(path))
            print(path.name)
        await b.close()
    srv.shutdown()


asyncio.run(main())
