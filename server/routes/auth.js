import { login, createUser } from "../controllers/auth.js";
import { Router } from "express";
const router = Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await login(username, password)
        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal server error' })
    }
})


router.post('/user', async (req, res) => {
    res.json(await createUser(
        req.body.name,
        req.body.pass,
        req.body.email))
})


export default router;