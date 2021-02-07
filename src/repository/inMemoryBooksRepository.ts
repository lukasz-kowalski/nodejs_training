import { Book } from '../types/Book'
import { BooksRepository } from '../types/BooksRepository'

export const createInMemoryBookRepository = (): BooksRepository => {
  let books: Book[] = [
    {
      id: 1,
      authors: ['Jonathan Haidt'],
      title: 'Coddling of the American Mind',
    },
    {
      id: 2,
      authors: ['Dan Heath', 'Chip Heath'],
      title: 'Switch: How to change when change is hard',
    },
    { id: 3, authors: ['Kathy Sierra'], title: 'Badass: Making users awesome' },
    {
      id: 4,
      authors: ['Daniel Kahneman'],
      title: 'Thinking fast, thinking slow',
    },
    { id: 5, authors: ['Caroline Dweck'], title: 'Mindset' },
    { id: 6, authors: ['Michael Walker'], title: 'Why we sleep?' },
  ]

  return {
    getAll() {
      return Promise.resolve(books)
    },
    add(data: Book) {
      books = books.concat(data)

      return Promise.resolve(true)
    },
    getById(id: number) {
      const book = books.filter((book) => book.id === id).pop()

      return Promise.resolve(book)
    },
    updateById(id: number, data: Book) {
      books = books.map((book) => (book.id === id ? data : book))

      return Promise.resolve(true)
    },
    deleteById(id: number) {
      books = books.filter((book) => book.id !== id)

      return Promise.resolve(true)
    },
  }
}
