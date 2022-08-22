import { Router } from 'express';
import { Team } from '../controllers';

const router = Router();

router.get('/', Team.getAll);
router.get('/teams/:id', Team.getById);

export default router;