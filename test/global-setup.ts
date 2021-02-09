import { db } from '../src/connection/db'

import {
  truncateTables,
  runMigrations,
  reseedTables,
  deleteTables,
} from './utils/database'

before(async () => {
  await deleteTables(db)
  await runMigrations(db)
})

beforeEach(async () => {
  await truncateTables(db)
  await reseedTables(db)
})
