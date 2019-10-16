// Update with your config settings.

module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './data/users.db3',
        },
        useNullAsDefault: true,
        migrations: {
            directory: './data/migrations',
        },
        seeds: {
            directory: './data/seeds',
        },
    },
    production: {
        client: 'sqlite3',
        connection: {
            filename: './data/users.db3',
        },
        useNullAsDefault: true,
        migrations: {
            directory: './data/migrations',
        },
        seeds: {
            directory: './data/seeds',
        },
    },
}[process.env.NODE_ENV || 'development'];
