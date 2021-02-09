require('dotenv').config()
import 'express-async-errors'
import express, { Request, Response } from 'express'
import { BooksRepository } from './types/BooksRepository'
import { Book } from './types/Book'
import { HTTP } from './consts'
import { notFoundHandler, serverErrorHandler } from './error'
import { BookNotFoundException } from './exceptions/BookNotFound'

export const createApp = (
  booksRepository: BooksRepository
): express.Application => {
  const app: express.Application = express()

  app.use(express.json())

  app.get('/', (req, res) => {
    res.send('Go to /books endpoint')
  })

  app.get('/books', async (req: Request, res: Response) => {
    const books = await booksRepository.getAll()
    res.status(HTTP.OK).json(books)
  })

  app.post('/books', async (req: Request, res: Response) => {
    const body: Book = req.body

    await booksRepository.add(body)

    res.sendStatus(HTTP.CREATED)
  })

  app.get('/books/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const book = await booksRepository.getById(id)

    if (!book) {
      throw new BookNotFoundException(id)
    }

    res.status(HTTP.OK).json(book)
  })

  app.put('/books/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const body = req.body

    await booksRepository.updateById(id, body)

    res.sendStatus(HTTP.ACCEPTED)
  })

  app.delete('/books/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    await booksRepository.deleteById(id)

    res.sendStatus(HTTP.ACCEPTED)
  })

  app.use(notFoundHandler)
  app.use(serverErrorHandler)

  return app
}
