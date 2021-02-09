import knex from 'knex'
import knexfile from '../../knexfile'

const configOptions = knexfile

export const db = knex(configOptions)
