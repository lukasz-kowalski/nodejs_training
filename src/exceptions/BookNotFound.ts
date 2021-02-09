import { HTTP } from '../consts'

export class BookNotFoundException extends Error {
  status: number

  constructor(id: number) {
    super()
    this.name = 'BOOK_NOT_FOUND'
    this.message = `Book not found: ${id}`
    this.status = HTTP.NOT_FOUND
  }
}
