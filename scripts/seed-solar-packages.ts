import {
  getSolarDbPath,
  listSolarPackages,
  seedSolarPackages,
} from '../server/utils/solar-db'

const count = seedSolarPackages(undefined, { force: true })
const packages = listSolarPackages()

console.log(`Seeded ${count} solar packages → ${getSolarDbPath()}`)
console.log(
  packages
    .map((p) => {
      const s = p.string_inverter.priceFrom
      const m = p.micro_inverter.priceFrom
      return `${p.code.padEnd(16)} ${p.phase}  string=${s ?? '—'}  micro=${m ?? '—'}`
    })
    .join('\n'),
)
