import cors from 'cors'
import express from 'express'

import { db } from './connection/db'
import { appFactory } from './app'
import { getAllowedHosts, HTTP } from './consts'

import { createBooksRouter } from './router/books'
import { createBooksController } from './controller/books'
import { createInMemoryBooksRepository } from './repository/inMemoryBooksRepository'
import { createPgSQLBooksRepository } from './repository/pgSQLBooksRepository'

import type { BooksRepository } from './types/BooksRepository'
import type { BooksController } from './types/BooksController'
import { CategoryRepository } from './types/CategoryRepository'
import { createPgSQLCategoryRepository } from './repository/pgSQLCategoryRepository'

const corsOptions: cors.CorsOptions = {
  origin: process.env.NODE_ENV === 'production' ? getAllowedHosts() : '*',
  optionsSuccessStatus: HTTP.OK,
}

const booksRepository: BooksRepository = createPgSQLBooksRepository(db)
const categoryRepository: CategoryRepository = createPgSQLCategoryRepository(db)
const booksController: BooksController = createBooksController(
  booksRepository,
  categoryRepository
)
const booksRouter: express.Router = createBooksRouter(booksController)

const corsMiddleware: express.Handler = cors(corsOptions)

const app = appFactory(booksRouter, corsMiddleware)

export { app }
