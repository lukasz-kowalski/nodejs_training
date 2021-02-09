import { Request, Response, NextFunction } from 'express'
export class StatusError extends Error {
  status: number
  constructor(message: string, status: number) {
    super()
    this.message = message
    this.status = status
  }
}

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err = new StatusError('Not Found', 404)
  next(err)
}

export const serverErrorHandler = (
  err: StatusError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //do not show stack traces for errors in CI environment
  !process.env.IN_CI && console.error(err.stack)
  res.status(err.status || 500)
  res.json({ message: err.message, error: err.stack })
}

export const BookNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err = new StatusError('Invalid book data', 404)
  next(err)
}
