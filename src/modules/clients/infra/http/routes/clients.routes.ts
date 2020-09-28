import { Router } from 'express';

import ClientsController from '../controllers/ClientsController';

const clientsController = new ClientsController();

const citiesRouter = Router();

citiesRouter.get('/:id', clientsController.index);

citiesRouter.post('/', clientsController.create);

citiesRouter.put('/:id', clientsController.update);

citiesRouter.delete('/:client_id', clientsController.delete);

export default citiesRouter;
