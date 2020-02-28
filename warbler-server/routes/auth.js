import express from 'express';
const authRouter = express.Router();
import { signupHandler, loginHandler } from '../handlers/auth.js';

authRouter.post('/signup', signupHandler);
authRouter.post('/login', loginHandler);

export default authRouter;
