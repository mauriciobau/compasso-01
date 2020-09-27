import { Router } from 'express';

import StatesController from '../controllers/StatesController';
import ListCitiesController from '../controllers/ListCitiesController';

const statesController = new StatesController();
const listCitiesController = new ListCitiesController();

const statesRouter = Router();

statesRouter.post('/', statesController.create);

statesRouter.get('/', statesController.index);

statesRouter.get('/:stateName', listCitiesController.index);

export default statesRouter;
