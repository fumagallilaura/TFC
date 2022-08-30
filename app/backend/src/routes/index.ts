import { Router } from 'express';
import login from './login';
import teams from './teams';
import matches from './matches';
import leaderboard from './leaderboard';


const routes = Router();

routes.use('/login', login);
routes.use('/teams', teams);
routes.use('/matches', matches);
routes.use('/leaderboard', leaderboard);

export default routes;