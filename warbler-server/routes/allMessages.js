import express from 'express';
const allMessagesRouter = express.Router({ mergeParams: true });

import { getAllMessages } from '../handlers/allMessages.js';

allMessagesRouter.get('/', getAllMessages);

export default allMessagesRouter;
