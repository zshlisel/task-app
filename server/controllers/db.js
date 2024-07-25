import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../private.env') }); // Adjust path if needed


import pgPromise from 'pg-promise';


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