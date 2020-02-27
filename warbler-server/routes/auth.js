import express from 'express';
const authRouter = express.Router();
import { signupHandler } from '../handlers/auth.js';

authRouter.post('/signup', signupHandler);

export default authRouter;
