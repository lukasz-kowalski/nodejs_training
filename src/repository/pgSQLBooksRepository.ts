import Knex from 'knex'

import type { Book } from '../types/Book'
import type { BooksRepository } from '../types/BooksRepository'

export const createPgSQLBooksRepository = (db: Knex): BooksRepository => {
  return {
    async getTotal() {
      let booksCount = await db<Book>('wsromek_books').count().first()

      return (booksCount && Number(booksCount.count)) || 0
    },
    getByPageAndLimit(page: number, limit: number) {
      const offset = (page - 1) * limit

      return db<Book>('wsromek_books').limit(limit).offset(offset).orderBy('id')
    },
    getAll() {
      return db<Book>('wsromek_books').orderBy('id')
    },
    add(data: Book) {
      return db<Book>('wsromek_books').insert({
        authors: JSON.stringify(data.authors),
        title: data.title,
      })
    },
    async getById(id: number) {
      return db<Book>('wsromek_books')
        .where({
          id,
        })
        .first()
    },
    updateById(id: number, data: Book) {
      return db<Book>('wsromek_books')
        .where({ id })
        .update({
          authors: JSON.stringify(data.authors),
          title: data.title,
        })
    },
    deleteById(id: number) {
      return db<Book>('wsromek_books').where({ id }).delete()
    },
  }
}
