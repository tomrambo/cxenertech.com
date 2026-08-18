import { existsSync, writeFileSync } from 'node:fs'

const worker = '.output/public/_worker.js'
if (!existsSync(worker)) {
  console.error(`Missing ${worker}`)
  console.error('Cloudflare deploy needs `nuxt build --preset cloudflare-pages`.')
  process.exit(1)
}

// Keep the Worker script from being uploaded as a downloadable static file.
writeFileSync(
  '.output/public/.assetsignore',
  ['_worker.js', '_routes.json', ''].join('\n'),
)
