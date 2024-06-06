import express from "express";
import cors from "cors";
import pgPromise from "pg-promise";
import 'dotenv/config';



const pgp = pgPromise();
const db = pgp({
    host: 'ep-rapid-wind-a6weniwm.us-west-2.retooldb.com',
    port: 5432,
    database: 'retool',
    user: 'retool',
    password: process.env.DB_PASSWORD,
    ssl: true
})

async function testConnection() {
    try {
      const result = await db.many('SELECT * from users');
      console.log('Connected to the PostgreSQL database:', result);
    } catch (err) {
      console.error('Error connecting to the PostgreSQL database:', err);
    }
  }
  
  testConnection();

const app = express()
app.use(cors())
app.use(express.json())

const port = 3000;

const tasks = [{
    id : 1,
    title : 'Register on VP',
    done : true
}, {
    id : 2,
    title : 'earn React.js',
    done : false
}, {
    id : 3,
    title : 'Learn Express.js',
    done : false
}]


// Define a simple route
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    tasks.push(req.body)
    res.json(tasks)
})

app.patch('/tasks/:id', (req, res) => {
    console.log('tasks', tasks)
    console.log(':id param', req.params.id)
    let task = tasks.find((task) => Number(task.id).toString() === req.params.id)
    if (task) {
        task.done = true;
    }
    res.json(tasks);
})

app.delete('/tasks/:id', (req, res) => {
    console.log('tasks', tasks)
    /*let task = tasks.find((task) => Number(task.id).toString() === req.params.id)
    if (task) {
        tasks.splice(task,1);
    }*/
    let index = tasks.findIndex(task => Number(task.id) === Number(req.params.id));
    if (index !== -1) {
        tasks.splice(index, 1);
    }
    res.json(tasks);
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});