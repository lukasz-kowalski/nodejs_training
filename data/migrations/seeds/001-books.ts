import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('wsromek_books').del()

  // Inserts seed entries
  await knex('wsromek_books').insert([
    // Since we used 'increments', do not pass id field, DB will sort it out itself
    {
      authors: JSON.stringify(['Jonathan Haidt']),
      title: 'Coddling of the American Mind',
      categoryId: 1,
    },
    {
      authors: JSON.stringify(['Dan Heath', 'Chip Heath']),
      title: 'Switch: How to change when change is hard',
      categoryId: 1,
    },
    {
      authors: JSON.stringify(['Dan Heath', 'Chip Heath']),
      title: 'Decisive: How to make better choices in life and work',
      categoryId: 1,
    },
    {
      authors: JSON.stringify(['Kathy Sierra']),
      title: 'Badass: Making users awesome',
      categoryId: 3,
    },
    {
      authors: JSON.stringify(['Daniel Kahneman']),
      title: 'Thinking fast, thinking slow',
      categoryId: 1,
    },
    {
      authors: JSON.stringify(['Caroline Dweck']),
      title: 'Mindset',
      categoryId: 1,
    },
    {
      authors: JSON.stringify(['Michael Walker']),
      title: 'Why we sleep?',
      categoryId: 4,
    },
    {
      authors: JSON.stringify(['Jonathan Haidt']),
      title: 'The Happiness Hypothesis',
      categoryId: 6,
    },
    {
      authors: JSON.stringify(['Patrick Lencioni']),
      title: 'The five dysfunctions of a team',
      categoryId: 1,
    },
    {
      authors: JSON.stringify(['Chris Voss']),
      title: 'Never split the difference',
      categoryId: 1,
    },
    {
      authors: JSON.stringify(['Marshall Rosenberg']),
      title: 'Non-violent Communication',
      categoryId: 1,
    },
    {
      authors: JSON.stringify(['Andy Hunt']),
      title: 'Practical thinking & learning',
      categoryId: 1,
    },
    {
      authors: JSON.stringify(['Steve Krug']),
      title: 'Do not make me think',
      categoryId: 2,
    },
    {
      authors: JSON.stringify(['Michael D. Watkins']),
      title: 'The First 90 Days',
      categoryId: 1,
    },
    {
      authors: JSON.stringify(['Sam Newman']),
      title: 'Building Microservices',
      categoryId: 5,
    },
    {
      authors: JSON.stringify(['Donald A. Norman']),
      title: 'The Design of Everyday Things',
      categoryId: 2,
    },
  ])
}
