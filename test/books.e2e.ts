import assert from 'assert'
import supertest from 'supertest'

import { HTTP } from '../src/consts'

import app from '../src/createApp'

const request = supertest(app)

type Book = {
  id: number
  authors: string[]
  title: string
}

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

describe('Books', () => {
  it('lists books', async () => {
    const getBooksRequest = await request
      .get('/books')
      .set('Accept', 'application/json')
      .expect(HTTP.OK)

    assert.deepStrictEqual(getBooksRequest.body, books)
  })

  it('add book', async () => {
    const payload: Book = {
      id: 9,
      authors: ['test'],
      title: 'test',
    }

    // add new book
    await request
      .post('/books')
      .set('Accept', 'application/json')
      .send(payload)
      .expect(HTTP.CREATED)

    // fetch list of books to verify if the added one is present
    const getBooksRequest = await request
      .get('/books')
      .set('Accept', 'application/json')
      .expect(HTTP.OK)

    const booksAfterAdd = books.concat(payload)

    // we expect the test book set plus the payload
    assert.deepStrictEqual(getBooksRequest.body, booksAfterAdd)
  })

  it('edit book', async () => {
    const payload: Book = {
      id: 9,
      authors: ['Edited test'],
      title: 'Edited test',
    }

    // update test book
    await request
      .put(`/books/${payload.id}`)
      .set('Accept', 'application/json')
      .send(payload)
      .expect(HTTP.ACCEPTED)

    // fetch list of books to verify if the updated one is present
    const getBooksRequest = await request
      .get('/books')
      .set('Accept', 'application/json')
      .expect(HTTP.OK)

    const booksAfterPut = books.concat(payload)

    // we expect the test book set plus the edited payload
    assert.deepStrictEqual(getBooksRequest.body, booksAfterPut)
  })

  it('delete book', async () => {
    const payload: Book = {
      id: 9,
      authors: ['Edited test'],
      title: 'Edited test',
    }

    // delete book
    await request
      .delete(`/books/${payload.id}`)
      .set('Accept', 'application/json')
      .expect(HTTP.ACCEPTED)

    // fetch list of books to verify if the removed one is present
    const getBooksRequest = await request
      .get('/books')
      .set('Accept', 'application/json')
      .expect(HTTP.OK)

    // we expect the test original book set again
    assert.deepStrictEqual(getBooksRequest.body, books)
  })

  it('handles fetching non-existing book', async () => {
    await request
      .get(`/books/99999`)
      .set('Accept', 'application/json')
      .expect(HTTP.NOT_FOUND)
  })
})
