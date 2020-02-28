import express from 'express';
const messagesRouter = express.Router({ mergeParams: true });
import { createMessage } from '../handlers/messages.js';

messagesRouter.post('/', createMessage);

export default messagesRouter;
