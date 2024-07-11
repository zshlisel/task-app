import express from "express";
import cors from "cors";
import taskRoute from './routes/tasks.js';
import authRoute from './routes/auth.js';
import rootRoute from './routes/root.js';
import userRoute from './routes/users.js';






const app = express()

app.use(cors())
app.use(express.json())
const port = 3000;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});



app.use('/tasks', taskRoute)
app.use('/auth', authRoute)
app.use('/', rootRoute)
app.use('/users', userRoute)


// starting server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


