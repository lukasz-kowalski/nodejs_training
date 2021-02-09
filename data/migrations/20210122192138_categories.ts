import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('wsromek_categories', (tbl) => {
    tbl.increments('id').primary()
    tbl.text('name').notNullable().defaultTo(null)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('wsromek_categories')
}
