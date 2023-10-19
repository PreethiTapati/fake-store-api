import express from "express";
import userController from "../controllers/user.js";
const { main, signUp, signIn } = userController;

const router = express.Router();

router.get('/', main)
router.post('/sign-up', signUp)
router.post('/sign-in', signIn)

export default router;