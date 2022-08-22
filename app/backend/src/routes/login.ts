import { Router } from 'express';
import User from '../controllers/User';
const router = Router();

router.post('/', User.login);
router.post('/validate', User.validate);

export default router;