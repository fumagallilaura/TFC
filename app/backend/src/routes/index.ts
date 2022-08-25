import { Router } from 'express';
import login from './login';
import teams from './team';
import matches from './matches';

const routes = Router();

routes.use('/login', login);
routes.use('/teams', teams);
routes.use('/matches', matches);

export default routes;