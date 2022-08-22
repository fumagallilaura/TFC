import { Router } from 'express';
import { Team } from '../controllers';

const router = Router();

router.get('/', Team.getAll);

export default router;