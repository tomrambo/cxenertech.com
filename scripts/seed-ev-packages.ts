import { seedPackages, getEvDbPath, listEvPackages } from '../server/utils/ev-db'

const count = seedPackages(undefined, { force: true })
const packages = listEvPackages()

console.log(`Seeded ${count} EV packages → ${getEvDbPath()}`)
console.log(
  packages.map((p) => `${p.code.padEnd(10)} ${p.product_type.padEnd(12)} ${p.slug}`).join('\n'),
)
