import db from "../controllers/db.js";
import { createTask, getTasks, markAsComplete, deleteTask } from "../controllers/tasks.js";
import {Router} from "express";
const router = Router();

let tasks = [];

router.get('/', async (req, res) => {
    const userId = req.headers['authorization']
    if (!userId){
        return res.status(401).json({error: 'Unauthorized'});
    }
    res.json(await getTasks(userId))
    if (res.json.length === 0){
        return res.status(200).json([]);
    }
    });



// post new task
router.post('/', async (req, res) => {
    const userId = req.headers['authorization']
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    res.json(await createTask(req.body.title, userId));
 })


// update completed task
router.patch('/:id', async (req, res) => {
    const userId = req.headers['authorization']
    if (!userId){
        return res.status(401).json({error: 'Unauthorized'});
    }
    res.json(await markAsComplete(req.params.id, userId))    
})


// mark task as deleted
router.delete('/:id', async (req, res) => {
    const userId = req.headers['authorization']
    if (!userId){
        return res.status(401).json({error: 'Unauthorized'});
    }
    res.json(await deleteTask(userId, req.params.id))
})



export default router;