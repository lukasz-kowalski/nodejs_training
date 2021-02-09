export default {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds',
  },
}
