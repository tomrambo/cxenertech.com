import { listChargerSpecs } from '../../../database/charger-specs'

export default defineEventHandler(() => {
  const specs = listChargerSpecs()
  return { count: specs.length, specs }
})
