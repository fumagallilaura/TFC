import { Router } from 'express';
import auth from '../controllers/auth';
import Leaderboard from '../controllers/Matches';
const router = Router();

router.get('/', Leaderboard.getAll);
router.post('/', auth, Leaderboard.teamsValidation, Leaderboard.create);
router.patch('/:id/finish', auth, Leaderboard.finish);
router.patch('/:id', auth, Leaderboard.update);

export default router;