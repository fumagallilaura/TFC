import { Router } from 'express';
import Leaderboard from '../controllers/Leaderboard';
const router = Router();

router.get('/leaderboard/home', Leaderboard.getHome);

export default router;