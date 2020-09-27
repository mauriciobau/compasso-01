import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStateService from '@modules/states/services/CreateStateService';
import ShowStatesService from '@modules/states/services/ShowStateService';

export default class StatesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const showStates = container.resolve(ShowStatesService);

    const states = await showStates.execute();

    return response.json(states);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createState = container.resolve(CreateStateService);

    const state = await createState.execute({
      name,
    });

    return response.json(state);
  }
}
