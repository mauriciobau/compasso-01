import { Router } from 'express';

import StatesController from '../controllers/StatesController';

const statesController = new StatesController();

const statesRouter = Router();

statesRouter.post(
  '/', statesController.create,
);

statesRouter.get(
  '/', statesController.index,
);

export default statesRouter;
