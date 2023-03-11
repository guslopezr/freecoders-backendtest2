const { Pool } = require('pg');

const dbUser = 'blacksam';
const dbHost = 'postgresql-blacksam.alwaysdata.net';
const dbDatabase = 'blacksam_freecoders';
const dbPassword = 'blacksam1234..';
const dbPort = '5432';

describe('database connection', () => {
    let pool;

    beforeAll(() => {
        pool = new Pool({
            user: dbUser,
            host: dbHost,
            database: dbDatabase,
            password: dbPassword,
            port: dbPort,
        });
    });

    afterAll(() => {
        pool.end();
    });

    test('can connect to the database', async() => {
        const result = await pool.query('SELECT NOW()');
        expect(result.rows).toHaveLength(1);
    });

    test('select all from programadores returns 4 rows', async() => {
        const result = await pool.query('SELECT * FROM programadores');
        expect(result.rows).toHaveLength(4);
    });

    test('select from programadores where nombre is Gustavo, Sergio, Andrea, and Esteban', async() => {
        const result = await pool.query("SELECT * FROM programadores WHERE nombre IN ('Gustavo', 'Sergio', 'Andrea', 'Esteban')");
        expect(result.rows).toHaveLength(4);
    });
});