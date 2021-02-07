import express from 'express'

const app: express.Application = express()

app.use(express.json())

const port = 3000

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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/books', (req, res) => {
  res.status(200).json(books)
})

app.get('/books/:id', (req, res) => {
  const id = Number(req.params.id)

  const filteredBook = books.filter((book) => book.id === id)

  res.status(200).json(filteredBook)
})

app.post('/books', (req, res) => {
  const newBook: Book = req.body

  newBook.id = Math.round(Math.random() * 1000)

  books.push(newBook)

  res.sendStatus(201)
})

app.put('/books/:id', (req, res) => {
  const id = Number(req.params.id)
  const newBook: Book = req.body

  const bookIndex = books.findIndex((book) => book.id === id)

  books[bookIndex] = { ...newBook, id }

  res.sendStatus(202)
})

app.delete('/books/:id', (req, res) => {
  const id = Number(req.params.id)

  books = books.filter((book) => book.id !== id)

  res.sendStatus(202)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
