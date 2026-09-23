// Sobe `next dev` sem as variáveis de detecção de agente.
// O Next 16 escreve AGENTS.md/CLAUDE.md na raiz quando detecta um agente
// (node_modules/next/dist/server/lib/generate-agent-files.js); CLAUDE.md é protegido.
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'

const AGENT_ENV = /^(AI_AGENT|CLAUDECODE|CLAUDE_CODE.*|CLAUDE|CURSOR.*|CODEX.*|GEMINI.*|GITHUB_COPILOT|COPILOT_.*|AUGMENT_.*|ANTIGRAVITY.*|OPENCODE.*|DEVIN|REPL_ID|REPLIT.*|COWORK)$/

const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !AGENT_ENV.test(key)))
const nextBin = createRequire(import.meta.url).resolve('next/dist/bin/next')

const child = spawn(process.execPath, [nextBin, 'dev', ...process.argv.slice(2)], { env, stdio: 'inherit' })
child.on('exit', (code) => process.exit(code ?? 0))
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal))
