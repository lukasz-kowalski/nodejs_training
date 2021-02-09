import { HTTP } from '../consts'

export class InvalidBookException extends Error {
  status: number

  constructor() {
    super()
    this.name = 'INVALID_BOOK'
    this.message = `Invalid book object!`
    this.status = HTTP.BAD_REQUEST
  }
}
