import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import Database from 'better-sqlite3'
import { EV_PACKAGE_SEED } from '../database/ev-package-seed'

type SqliteDb = InstanceType<typeof Database>

export type EvPackageRow = {
  id: string
  slug: string
  code: string
  name: string
  name_th: string
  product_type: 'equipment' | 'turnkey' | 'investment'
  source_label: string
  tagline: string
  description: string
  power_kw_min: number
  power_kw_max: number
  charger_count: number | null
  nozzle_count_min: number
  nozzle_count_max: number
  parking_bays: number | null
  transformer_kva: number | null
  footprint_w_m: number | null
  footprint_d_m: number | null
  price_list: number | null
  price_promo: number | null
  price_capex: number | null
  currency: string
  price_note: string
  roi_annual_pct: number | null
  payback_months: number | null
  net_profit_monthly: number | null
  specs_json: string
  includes_json: string
  features_json: string
  financials_json: string | null
  target_sites_json: string
  sort_order: number
  active: number
  created_at: string
  updated_at: string
}

export type EvPackage = Omit<
  EvPackageRow,
  | 'specs_json'
  | 'includes_json'
  | 'features_json'
  | 'financials_json'
  | 'target_sites_json'
  | 'active'
> & {
  specs: Record<string, string | number>
  includes: string[]
  features: string[]
  financials: Record<string, string | number> | null
  targetSites: string[]
  active: boolean
}

const DB_PATH = join(process.cwd(), 'data', 'ev-packages.sqlite')

let db: SqliteDb | null = null

function openDb() {
  if (db) return db
  mkdirSync(dirname(DB_PATH), { recursive: true })
  db = new Database(DB_PATH)
  db.pragma('journal_mode = WAL')
  ensureSchema(db)
  seedIfEmpty(db)
  return db
}

function ensureSchema(database: SqliteDb) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS ev_packages (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      code TEXT NOT NULL,
      name TEXT NOT NULL,
      name_th TEXT NOT NULL,
      product_type TEXT NOT NULL,
      source_label TEXT NOT NULL,
      tagline TEXT NOT NULL,
      description TEXT NOT NULL,
      power_kw_min REAL NOT NULL,
      power_kw_max REAL NOT NULL,
      charger_count INTEGER,
      nozzle_count_min INTEGER NOT NULL,
      nozzle_count_max INTEGER NOT NULL,
      parking_bays INTEGER,
      transformer_kva INTEGER,
      footprint_w_m REAL,
      footprint_d_m REAL,
      price_list INTEGER,
      price_promo INTEGER,
      price_capex INTEGER,
      currency TEXT NOT NULL DEFAULT 'THB',
      price_note TEXT NOT NULL DEFAULT '',
      roi_annual_pct REAL,
      payback_months REAL,
      net_profit_monthly INTEGER,
      specs_json TEXT NOT NULL,
      includes_json TEXT NOT NULL,
      features_json TEXT NOT NULL,
      financials_json TEXT,
      target_sites_json TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_ev_packages_type ON ev_packages(product_type);
    CREATE INDEX IF NOT EXISTS idx_ev_packages_active ON ev_packages(active);
  `)
}

function seedIfEmpty(database: SqliteDb) {
  const row = database.prepare('SELECT COUNT(*) AS c FROM ev_packages').get() as { c: number }
  if (row.c > 0) return
  seedPackages(database)
}

export function seedPackages(database: SqliteDb = openDb(), { force = false } = {}) {
  if (force) {
    database.exec('DELETE FROM ev_packages')
  }

  const now = new Date().toISOString()
  const upsert = database.prepare(`
    INSERT INTO ev_packages (
      id, slug, code, name, name_th, product_type, source_label, tagline, description,
      power_kw_min, power_kw_max, charger_count, nozzle_count_min, nozzle_count_max,
      parking_bays, transformer_kva, footprint_w_m, footprint_d_m,
      price_list, price_promo, price_capex, currency, price_note,
      roi_annual_pct, payback_months, net_profit_monthly,
      specs_json, includes_json, features_json, financials_json, target_sites_json,
      sort_order, active, created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, 'THB', ?,
      ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, 1, ?, ?
    )
    ON CONFLICT(id) DO UPDATE SET
      slug=excluded.slug,
      code=excluded.code,
      name=excluded.name,
      name_th=excluded.name_th,
      product_type=excluded.product_type,
      source_label=excluded.source_label,
      tagline=excluded.tagline,
      description=excluded.description,
      power_kw_min=excluded.power_kw_min,
      power_kw_max=excluded.power_kw_max,
      charger_count=excluded.charger_count,
      nozzle_count_min=excluded.nozzle_count_min,
      nozzle_count_max=excluded.nozzle_count_max,
      parking_bays=excluded.parking_bays,
      transformer_kva=excluded.transformer_kva,
      footprint_w_m=excluded.footprint_w_m,
      footprint_d_m=excluded.footprint_d_m,
      price_list=excluded.price_list,
      price_promo=excluded.price_promo,
      price_capex=excluded.price_capex,
      price_note=excluded.price_note,
      roi_annual_pct=excluded.roi_annual_pct,
      payback_months=excluded.payback_months,
      net_profit_monthly=excluded.net_profit_monthly,
      specs_json=excluded.specs_json,
      includes_json=excluded.includes_json,
      features_json=excluded.features_json,
      financials_json=excluded.financials_json,
      target_sites_json=excluded.target_sites_json,
      sort_order=excluded.sort_order,
      updated_at=excluded.updated_at
  `)

  for (const p of EV_PACKAGE_SEED) {
    upsert.run(
      p.id,
      p.slug,
      p.code,
      p.name,
      p.nameTh,
      p.productType,
      p.sourceLabel,
      p.tagline,
      p.description,
      p.powerKwMin,
      p.powerKwMax,
      p.chargerCount,
      p.nozzleCountMin,
      p.nozzleCountMax,
      p.parkingBays,
      p.transformerKva,
      p.footprintWm,
      p.footprintDm,
      p.priceList,
      p.pricePromo,
      p.priceCapex,
      p.priceNote,
      p.roiAnnualPct,
      p.paybackMonths,
      p.netProfitMonthly,
      JSON.stringify(p.specs),
      JSON.stringify(p.includes),
      JSON.stringify(p.features),
      p.financials ? JSON.stringify(p.financials) : null,
      JSON.stringify(p.targetSites),
      p.sortOrder,
      now,
      now,
    )
  }

  return EV_PACKAGE_SEED.length
}

function mapRow(row: EvPackageRow): EvPackage {
  return {
    id: row.id,
    slug: row.slug,
    code: row.code,
    name: row.name,
    name_th: row.name_th,
    product_type: row.product_type,
    source_label: row.source_label,
    tagline: row.tagline,
    description: row.description,
    power_kw_min: row.power_kw_min,
    power_kw_max: row.power_kw_max,
    charger_count: row.charger_count,
    nozzle_count_min: row.nozzle_count_min,
    nozzle_count_max: row.nozzle_count_max,
    parking_bays: row.parking_bays,
    transformer_kva: row.transformer_kva,
    footprint_w_m: row.footprint_w_m,
    footprint_d_m: row.footprint_d_m,
    price_list: row.price_list,
    price_promo: row.price_promo,
    price_capex: row.price_capex,
    currency: row.currency,
    price_note: row.price_note,
    roi_annual_pct: row.roi_annual_pct,
    payback_months: row.payback_months,
    net_profit_monthly: row.net_profit_monthly,
    specs: JSON.parse(row.specs_json),
    includes: JSON.parse(row.includes_json),
    features: JSON.parse(row.features_json),
    financials: row.financials_json ? JSON.parse(row.financials_json) : null,
    targetSites: JSON.parse(row.target_sites_json),
    sort_order: row.sort_order,
    active: row.active === 1,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

export function listEvPackages(filters?: { type?: string }) {
  const database = openDb()
  let sql = 'SELECT * FROM ev_packages WHERE active = 1'
  const params: string[] = []
  if (filters?.type && filters.type !== 'all') {
    sql += ' AND product_type = ?'
    params.push(filters.type)
  }
  sql += ' ORDER BY sort_order ASC, name ASC'
  const rows = database.prepare(sql).all(...params) as EvPackageRow[]
  return rows.map(mapRow)
}

export function getEvPackageBySlug(slug: string) {
  const database = openDb()
  const row = database.prepare('SELECT * FROM ev_packages WHERE slug = ? AND active = 1').get(slug) as
    | EvPackageRow
    | undefined
  return row ? mapRow(row) : null
}

export function getEvDbPath() {
  return DB_PATH
}
