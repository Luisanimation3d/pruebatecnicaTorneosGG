import { Router } from 'express';
import { getTest } from '../controllers/test';

const routes = Router();

routes.get('/', getTest);


export default routes;