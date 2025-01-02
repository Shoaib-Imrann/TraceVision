import express from 'express';
import { storeLog } from '../controllers/logController.js';
// import authenticateUser from '../middleware/auth.js';

const logRouter = express.Router();

logRouter.post('/store_log', storeLog);

export default logRouter;
