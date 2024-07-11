import pgPromise from "pg-promise";
import 'dotenv/config';


const pgp = pgPromise();
const db = pgp({
    host: 'ep-soft-resonance-a6dcqwl4.us-west-2.retooldb.com',
    port: 5432,
    database: 'retool',
    user: 'retool',
    password: process.env.DB_PASSWORD,
    ssl: true
})

export default db;