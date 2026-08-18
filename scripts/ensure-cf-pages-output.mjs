import { existsSync, writeFileSync } from 'node:fs'

const worker = 'dist/_worker.js/index.js'
if (!existsSync(worker)) {
  console.error(`Missing ${worker}`)
  console.error('Nitro cloudflare-pages writes the Worker to dist/_worker.js/index.js')
  process.exit(1)
}

// Keep the Worker script from being uploaded as a downloadable static file.
writeFileSync(
  'dist/.assetsignore',
  ['_worker.js', '_routes.json', ''].join('\n'),
)
