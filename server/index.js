import express from "express";
import cors from "cors";
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


const app = express()
app.use(cors())
app.use(express.json())
const port = 3000;

const tasks = [];


// get tasks
app.get('/tasks', async (req, res) => {
    const result = await db.many('select * from task where deleted_at is null');
    res.json(result.map(task => ({ id: task.id, title: task.title, done: task.status !== 'active'})))
});

// post new task
app.post('/tasks', async (req, res) => {
    const result = await db.one('insert into task (title, user_id) values (${title}, ${user_id}) returning *', {
        title: req.body.title,
        user_id:3
    })
    console.log('result', result)
    res.json({
        title: result.title,
        done: false,
        id: result.id
    })
})

// update completed task
app.patch('/tasks/:id', async (req, res) => {
    console.log('tasks', tasks)
    console.log(':id param', req.params.id)
    const result = await db.none("update task set status = 'done' where id = ${id}", {
        id: req.params.id
    })
    res.json({ok: true});
})

// mark task as deleted
app.delete('/tasks/:id', async (req, res) => {
    await db.none("update task set deleted_at = now() where id = ${id}", {
        id: req.params.id
    })
    res.json({ok: true})
})

//check login
/*app.post('/login', async (req, res) => {
    const result = await db.one('insert into task (title, user_id) values (${title}, ${user_id}) returning *', {
        title: req.body.title,
        user_id:1 
    })
    console.log('result', result)
    res.json({
        title: result.title,
        done: false,
        id: result.id
    })
})*/
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await db.oneOrNone('SELECT * FROM person WHERE name = ${username}', { username });
        if (user && user.pass === password) {
            res.json({ ok: true });
        } else {
            res.json({ ok: false });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error during login');
    }
});

//post new user
app.post('/user', async (req, res) => {
    const result = await db.one('insert into person (name,email, pass) values (${name},${email}, ${pass}) returning *', {
        name: req.body.name,
        pass: req.body.pass,
        email : req.body.email
    })
    console.log('result', result)
    res.json({
        name: result.name,
        email: result.email,
        id: result.id
    })
})

// starting server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
