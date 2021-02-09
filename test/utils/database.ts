import Knex from 'knex'

const getTables = async (knex: Knex) => {
  //equivalent to SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public'
  return knex
    .select('tablename')
    .from('pg_catalog.pg_tables')
    .where('schemaname', 'public')
}

export const deleteTables = async (knex: Knex) => {
  const tables = await getTables(knex)

  for (const table of tables) {
    await knex.raw(`DROP TABLE ${table.tablename} CASCADE`)
  }
}

export const truncateTables = async (knex: Knex) => {
  const tables = await getTables(knex)

  for (const table of tables) {
    await knex.raw(`TRUNCATE ${table.tablename} RESTART IDENTITY CASCADE`)
  }
}

export const runMigrations = async (knex: Knex) => {
  await knex.migrate.latest()
}

export const reseedTables = async (knex: Knex) => {
  await knex.seed.run()
}
