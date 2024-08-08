import { Router } from "express";
import { updateUserName } from "../controllers/users.js";
import multer from 'multer'
const router = Router();

const upload = multer({
    dest: './uploads'
})

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

router.post('/upload-profile', upload.single('profile'), (req, res, next) => {
    res.send({ 
        success: true,
        originalName: req.file.originalname,
        url: `http://localhost:3000/images/${req.file.filename}`
     })
})

export default router;
