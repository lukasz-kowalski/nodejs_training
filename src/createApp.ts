import { createApp } from './app'
import { createInMemoryBookRepository } from './repository/inMemoryBooksRepository'

import type { BooksRepository } from './types/BooksRepository'

const booksRepository: BooksRepository = createInMemoryBookRepository()

const app = createApp(booksRepository)

export default app
