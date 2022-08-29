import { Router } from 'express';
import auth from '../middlewares/Autentication';
import Matches from '../controllers/Matches';
const router = Router();

router.get('/', Matches.getAll);
router.post('/', (req, res, next) => auth.middleware(req, res, next), Matches.teamsValidation, Matches.create);

export default router;