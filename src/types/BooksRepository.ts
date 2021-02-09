import type { Book } from './Book'

export type BooksRepository = {
  getTotal(): Promise<number>
  getByPageAndLimit: (page: number, limit: number) => Promise<Book[]>
  getAll: () => Promise<Book[]>
  add: (book: Book) => void
  getById: (id: number) => Promise<Book | undefined>
  updateById: (id: number, data: Book) => Promise<boolean>
  deleteById: (id: number) => Promise<boolean>
}
