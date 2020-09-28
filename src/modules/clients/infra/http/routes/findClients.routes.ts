import { Router } from 'express';

import FindClientController from '../controllers/FindClientController';

const findClientController = new FindClientController();

const citiesRouter = Router();

citiesRouter.get('/', findClientController.index);

export default citiesRouter;
