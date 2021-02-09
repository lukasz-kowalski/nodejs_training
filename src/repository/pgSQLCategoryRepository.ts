import Knex from 'knex'

import type { Book } from '../types/Book'
import type { CategoryRepository } from '../types/CategoryRepository'

export const createPgSQLCategoryRepository = (db: Knex): CategoryRepository => {
  return {
    async getByCategoryName(categoryName: string) {
      return db<Book>('wsromek_books')
        .select(
          'wsromek_books.id',
          'wsromek_books.title',
          'wsromek_books.authors'
        )
        .leftJoin(
          'wsromek_categories',
          'wsromek_books.categoryId',
          'wsromek_categories.id'
        )
        .where('wsromek_categories.name', categoryName)
    },
  }
}
