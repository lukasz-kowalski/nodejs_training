import { db } from '../src/connection/db'

import {
  runMigrations,
  reseedTables,
  deleteTables,
} from '../test/utils/database'
;(async () => {
  await deleteTables(db)
  await runMigrations(db)
  await reseedTables(db)

  //destroy DB client connection
  await db.destroy()
})()
