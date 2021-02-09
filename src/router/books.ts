import express from 'express'

import type { BooksController } from '../types/BooksController'

export const createBooksRouter = (
  booksController: BooksController
): express.Router => {
  const booksRouter = express.Router()

  booksRouter.get('/', (req, res) => {
    res.send('Go to /books endpoint')
  })
  booksRouter.get('/books', booksController.getBooks)
  booksRouter.get('/books/:id', booksController.getBookById)
  booksRouter.post('/books', booksController.createBook)
  booksRouter.put('/books/:id', booksController.updateBookById)
  booksRouter.delete('/books/:id', booksController.deleteBookById)

  booksRouter.get(
    '/books/category/:categoryName',
    booksController.getBooksByCategoryName
  )

  return booksRouter
}
