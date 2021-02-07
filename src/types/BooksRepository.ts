import { Book } from './Book'

export type BooksRepository = {
  getAll: () => Promise<Book[]>
  add: (book: Book) => Promise<boolean>
  getById: (id: number) => Promise<Book | undefined>
  updateById: (id: number, data: Book) => Promise<boolean>
  deleteById: (id: number) => Promise<boolean>
}
