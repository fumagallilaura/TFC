import { Router } from 'express';
import auth from '../controllers/auth';
import Matches from '../controllers/Matches';
const router = Router();

router
  .get('/', Matches.getAll);
router.post('/', auth, Matches.teamsValidation, Matches.create);

export default router;