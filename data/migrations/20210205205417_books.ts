import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('wsromek_books', (tbl) => {
    tbl.increments('id').primary()

    tbl.text('title').notNullable().defaultTo(null)
    tbl.json('authors').notNullable().defaultTo(JSON.stringify([]))

    tbl
      .integer('categoryId')
      .unsigned()
      .index()
      .references('id')
      .inTable('wsromek_categories')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('wsromek_books')
}
