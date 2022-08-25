import { Router } from 'express';
import User from '../controllers/Login';
const router = Router();

router.post('/', User.login);
router.get('/validate', User.validate);

export default router;