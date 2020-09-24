import { Router } from 'express';

import statesRouter from '../../../../modules/states/infra/http/routes/states.routes';


const routes = Router();

routes.use('/states', statesRouter);

export default routes;
