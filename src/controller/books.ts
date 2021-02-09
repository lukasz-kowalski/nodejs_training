import { Request, Response } from 'express'

import { HTTP, PER_PAGE } from '../consts'
import { BookNotFoundException } from '../exception/bookNotFound'

import type { Book } from '../types/Book'
import type { BooksRepository } from '../types/BooksRepository'
import type { BooksController } from '../types/BooksController'
import { CategoryRepository } from '../types/CategoryRepository'
import { bookSchema } from '../schema/book'
import { InvalidBookException } from '../exception/invalidBook'

export const createBooksController = (
  booksRepository: BooksRepository,
  categoryRepository: CategoryRepository
): BooksController => {
  const generateLinkHeader = (page: number, limit: number, total: number) => {
    const nextPage = page * limit < total ? page + 1 : null
    const prevPage = page > 1 ? page - 1 : null

    const headerContent = []

    if (nextPage) {
      headerContent.push(
        `</books?page=${nextPage}&limit=${limit}>; rel="nextPage"`
      )
    }

    if (prevPage) {
      headerContent.push(
        `</books?page=${prevPage}&limit=${limit}>; rel="prevPage"`
      )
    }

    return headerContent.join(',')
  }

  return {
    async createBook(req: Request, res: Response) {
      const body: Book = req.body

      try {
        await bookSchema.validateAsync(body)
      } catch (err) {
        throw new InvalidBookException()
      }

      await booksRepository.add(body)

      res.sendStatus(HTTP.CREATED)
    },
    async getBooksByCategoryName(req: Request, res: Response) {
      const categoryName = req.params.categoryName

      const books = await categoryRepository.getByCategoryName(categoryName)

      res.status(HTTP.OK).json(books)
    },
    async getBooks(req: Request, res: Response) {
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || PER_PAGE

      const totalBooks = await booksRepository.getTotal()
      const result = await booksRepository.getByPageAndLimit(page, limit)

      res
        .status(HTTP.OK)
        .header({
          Link: generateLinkHeader(page, limit, totalBooks),
        })
        .json({
          totalBooks,
          result,
        })
    },
    async getBookById(req: Request, res: Response) {
      const id = Number(req.params.id)
      const book = await booksRepository.getById(id)

      if (!book) {
        throw new BookNotFoundException(id)
      }

      res.status(HTTP.OK).json(book)
    },
    async updateBookById(req: Request, res: Response) {
      const id = Number(req.params.id)
      const body: Book = req.body

      try {
        await bookSchema.validateAsync(body)
      } catch (err) {
        throw new InvalidBookException()
      }

      const result = await booksRepository.updateById(id, body)

      if (!result) {
        throw new BookNotFoundException(id)
      }

      res.sendStatus(HTTP.ACCEPTED)
    },
    async deleteBookById(req: Request, res: Response) {
      const id = Number(req.params.id)
      const result = await booksRepository.deleteById(id)

      if (!result) {
        throw new BookNotFoundException(id)
      }

      res.sendStatus(HTTP.ACCEPTED)
    },
  }
}
