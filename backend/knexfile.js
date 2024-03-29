// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: 'src/database/db.sqlite'
    },
    migrations: {
      directory: 'src/database/migrations'
    },
    useNullAsDefaul: true,
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: 'src/database/test.sqlite'
    },
    migrations: {
      directory: 'src/database/migrations'
    },
    useNullAsDefaul: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
