import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('wsromek_categories').del()

  // Inserts seed entries
  await knex('wsromek_categories').insert([
    {
      name: 'Psychology',
    },
    {
      name: 'Design',
    },
    {
      name: 'Product',
    },
    {
      name: 'Science',
    },
    {
      name: 'IT',
    },
    {
      name: 'Philosophy',
    },
  ])
}
