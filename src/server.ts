import app from './createApp'

app.listen(process.env.PORT || 3000, () =>
  console.log(`API listening on port ${process.env.PORT || 3000}`)
)
