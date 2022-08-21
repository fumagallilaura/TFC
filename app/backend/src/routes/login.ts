import { Router } from 'express';
import User from '../controllers/User';
const router = Router();

router.post('/', User.login);

export default router;