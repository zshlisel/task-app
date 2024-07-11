import { Router } from "express";
import { updateUserName } from "../controllers/users.js";
const router = Router();

router.patch('/name', async (req, res) => {
    try {
        const userId = req.headers['authorization']
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        res.json(await updateUserName(userId, req.body.newName))
    } catch (e) {
        console.error(e)
    }
})


export default router;
