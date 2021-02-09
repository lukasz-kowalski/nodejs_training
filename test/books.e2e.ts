import assert from 'assert'
import supertest from 'supertest'

import { app } from '../src/createApp'
import { HTTP } from '../src/consts'
import { Book } from '../src/types/Book'

const request = supertest(app)

const TOTAL_BOOKS_IN_SEED = 16

describe('Books', () => {
  it('lists books', async () => {
    const getBooksRequest = await request
      .get('/books')
      .set('Accept', 'application/json')
      .expect('Link', '</books?page=2&limit=5>; rel="nextPage"')
      .expect(HTTP.OK)

    //we know the quantity of data in our mock set
    assert.strictEqual(getBooksRequest.body.totalBooks, TOTAL_BOOKS_IN_SEED)
  })

  it('lists books by category', async () => {
    const getBooksRequest = await request
      .get('/books/category/Science')
      .set('Accept', 'application/json')
      .expect(HTTP.OK)

    //we know the quantity of data in our mock set
    assert.deepStrictEqual(getBooksRequest.body, [
      {
        authors: ['Michael Walker'],
        id: 7,
        title: 'Why we sleep?',
      },
    ])
  })

  it('respects pagination parameters and serves Link header with pagination links', async () => {
    let getBooksRequest = await request
      .get(`/books?page=2&limit=10`)
      .set('Accept', 'application/json')
      .expect('Link', '</books?page=1&limit=10>; rel="prevPage"')
      .expect(HTTP.OK)

    //we know the quantity of data in our mock set
    assert.strictEqual(getBooksRequest.body.totalBooks, TOTAL_BOOKS_IN_SEED)

    //total - limit equals amount of books on page 2
    assert.strictEqual(
      getBooksRequest.body.result.length,
      TOTAL_BOOKS_IN_SEED - 10
    )

    const limit = 5
    getBooksRequest = await request
      .get(`/books?page=2&limit=${limit}`)
      .set('Accept', 'application/json')
      .expect(
        'Link',
        '</books?page=3&limit=5>; rel="nextPage",</books?page=1&limit=5>; rel="prevPage"'
      )
      .expect(HTTP.OK)

    // quantity equal to limit
    assert.strictEqual(getBooksRequest.body.result.length, limit)
  })

  it('add book', async () => {
    const payload: Partial<Book> = {
      authors: ['test'],
      title: 'newly created test book with unique name',
    }

    // add new book
    await request
      .post('/books')
      .set('Accept', 'application/json')
      .send(payload)
      .expect(HTTP.CREATED)

    // fetch list of books with limit === 20 to verify if the added one is present
    const getBooksRequest = await request
      .get('/books?limit=20')
      .set('Accept', 'application/json')
      .expect(HTTP.OK)

    assert.strictEqual(getBooksRequest.body.totalBooks, TOTAL_BOOKS_IN_SEED + 1)

    let filteredBooks = getBooksRequest.body.result.filter(
      (book: Book) => book.title === payload.title
    )
    assert.strictEqual(filteredBooks.length, 1)
  })

  it('rejects invalid book addition', async () => {
    const payload: Partial<Book> = {
      title: 'newly created test book with unique name',
    }

    // add invalid book
    await request
      .post('/books')
      .set('Accept', 'application/json')
      .send(payload)
      .expect(HTTP.BAD_REQUEST)
  })

  it('rejects invalid book update', async () => {
    const payload: Partial<Book> = {
      title: 'newly updated test book with unique name',
    }

    // update invalid book
    await request
      .put('/books/1')
      .set('Accept', 'application/json')
      .send(payload)
      .expect(HTTP.BAD_REQUEST)
  })

  it('edit book', async () => {
    const id = 1
    const payload: Partial<Book> = {
      authors: ['Edited test'],
      title: 'newly created test book with unique name',
    }

    // update test book
    await request
      .put(`/books/${id}`)
      .set('Accept', 'application/json')
      .send(payload)
      .expect(HTTP.ACCEPTED)

    // fetch list of books with limit === 20 to verify if the added one is present
    const getBooksRequest = await request
      .get('/books?limit=20')
      .set('Accept', 'application/json')
      .expect(HTTP.OK)

    assert.strictEqual(getBooksRequest.body.totalBooks, TOTAL_BOOKS_IN_SEED)

    let filteredBooks = getBooksRequest.body.result.filter(
      (book: Book) => book.title === payload.title
    )
    assert.strictEqual(filteredBooks.length, 1)
  })

  it('delete book', async () => {
    const bookToDeleteId = 1

    // delete test book
    await request
      .delete(`/books/${bookToDeleteId}`)
      .set('Accept', 'application/json')
      .expect(HTTP.ACCEPTED)

    // fetch list of books to verify if the removed one is missing
    const getBooksRequest = await request
      .get('/books?limit=20')
      .set('Accept', 'application/json')
      .expect(HTTP.OK)

    assert.strictEqual(getBooksRequest.body.totalBooks, TOTAL_BOOKS_IN_SEED - 1)
  })

  it('handles fetching non-existing book', async () => {
    // delete non-existing book
    await request
      .get(`/books/99999`)
      .set('Accept', 'application/json')
      .expect(HTTP.NOT_FOUND)
  })

  it('handles deleting non-existing book', async () => {
    // delete non-existing book
    await request
      .delete(`/books/99999`)
      .set('Accept', 'application/json')
      .expect(HTTP.NOT_FOUND)
  })
})
