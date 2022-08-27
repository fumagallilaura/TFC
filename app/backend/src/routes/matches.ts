import { Router } from 'express';
import Autentication from '../middlewares/Autentication';
import Matches from '../controllers/Matches';
const router = Router();
const auth = new Autentication();

router.get('/', Matches.getAll);
router.post('/', auth.middleware, Matches.teamsValidation, Matches.create);

export default router;