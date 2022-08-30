import { Router } from 'express';
import Leaderboard from '../controllers/Leaderboards';
const router = Router();

router.get('/home', Leaderboard.getHome);

export default router;