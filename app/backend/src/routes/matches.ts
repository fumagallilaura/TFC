import { Router } from 'express';
import Matches from '../controllers/Matches';
const router = Router();

router.get('/', Matches.getAll);

export default router;