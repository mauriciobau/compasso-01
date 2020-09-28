import { Router } from 'express';

import statesRouter from '@modules/states/infra/http/routes/states.routes';
import citiesRouter from '@modules/cities/infra/http/routes/cities.routes';
import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';
import findClientsRouter from '@modules/clients/infra/http/routes/findClients.routes';

const routes = Router();

routes.use('/states', statesRouter);
routes.use('/cities', citiesRouter);
routes.use('/clients', clientsRouter);
routes.use('/findClient', findClientsRouter);

export default routes;
