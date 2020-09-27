import { Router } from 'express';

import CitiesController from '../controllers/CitiesController';

const citiesController = new CitiesController();

const citiesRouter = Router();

citiesRouter.post('/', citiesController.create);

citiesRouter.get('/', citiesController.index);

export default citiesRouter;
