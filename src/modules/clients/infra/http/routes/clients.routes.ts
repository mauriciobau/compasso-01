import { Router } from 'express';

import ClientsController from '../controllers/ClientsController';
import FindClientController from '../controllers/FindClientController';

const clientsController = new ClientsController();
const findClientController = new FindClientController();

const citiesRouter = Router();

citiesRouter.get('/:id', clientsController.index);

citiesRouter.post('/', clientsController.create);

citiesRouter.put('/:id', clientsController.update);

citiesRouter.delete('/:client_id', clientsController.delete);

citiesRouter.get('/find/:name', findClientController.index);

export default citiesRouter;
