import { Router } from 'express';
import auth from '../controllers/auth';
import Matches from '../controllers/Matches';
const router = Router();

router.get('/', Matches.getAll);
router.post('/', auth, Matches.teamsValidation, Matches.create);
router.patch('/:id/finish', auth, Matches.finish);
router.patch('/:id', auth, Matches.update);

export default router;