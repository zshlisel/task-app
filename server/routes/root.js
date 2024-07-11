import express from "express";
import { Router } from "express";
import { clientPath } from "../controllers/root.js";
const router = Router();


router.use(express.static(clientPath));

router.get('/', (req, res,) => {
   res.sendFile(path.join(clientPath, 'index.html'));
})

export default router;