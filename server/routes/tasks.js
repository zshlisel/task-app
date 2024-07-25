import db from "../controllers/db.js";
import { createTask, getTasks, markAsComplete, deleteTask } from "../controllers/tasks.js";
import passport from "passport"
import {Router} from "express";
const router = Router();

router.use(passport.authenticate('cookie', {
    session: false
  }))



router.get('/', async (req, res) => {
    res.json(await getTasks(req.user.id))
    if (res.json.length === 0){
        return res.status(200).json([]);
    }
    });



// post new task
router.post('/', async (req, res) => {
    res.json(await createTask(req.body.title, req.user.id));
 })


// update completed task
router.patch('/:id', async (req, res) => {
    res.json(await markAsComplete(req.params.id, req.user.id))    
})


// mark task as deleted
router.delete('/:id', async (req, res) => {
    res.json(await deleteTask(req.user.id, req.params.id))
})



export default router;