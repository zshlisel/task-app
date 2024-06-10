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
    const userId = req.headers['authorization']
    if (!userId){
        return res.status(401).json({error: 'Unauthorized'});
    }
    const result = await db.manyOrNone('select * from task where deleted_at is null and user_id = ${userId}',{userId});
    if (result.length === 0){
        return res.status(200).json([]);
    }
    res.json(result.map(task => ({ id: task.id, title: task.title, done: task.status !== 'active'})))
});


// post new task
app.post('/tasks', async (req, res) => {
    const userId = req.headers['authorization']
    if (!userId){
        return res.status(401).json({error: 'Unauthorized'});
    }
    const result = await db.one('insert into task (title, user_id) values (${title}, ${userId}) returning *', {
        title: req.body.title,
        userId
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
    const userId = req.headers['authorization']
    if (!userId){
        return res.status(401).json({error: 'Unauthorized'});
    }
    console.log('tasks', tasks)
    console.log(':id param', req.params.id)
    const result = await db.none("update task set status = 'done' where user_id = ${userId} and id = ${id}", {
        id: req.params.id,
        userId
    })
    res.json({ok: true});
})


// mark task as deleted
app.delete('/tasks/:id', async (req, res) => {
    const userId = req.headers['authorization']
    await db.none("update task set deleted_at = now() where user_id = ${userId} and id = ${id}", {
        id: req.params.id,
        userId
    })
    res.json({ok: true})
})


//user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await db.oneOrNone('SELECT * FROM person WHERE name = ${username}', { username });
    if (user && user.pass === password) {
        res.json({ ok: true, userId: user.id });
    } else {
        res.json({ ok: false });
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
        userId: result.id
    })
})

// starting server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
