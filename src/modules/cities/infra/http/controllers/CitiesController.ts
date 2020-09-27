/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCityService from '@modules/cities/services/CreateCityService';
import ShowCityService from '@modules/cities/services/ShowCityService';

export default class CitiesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const showCity = container.resolve(ShowCityService);

    const city = await showCity.execute({ name });

    return response.json(city);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, state_id } = request.body;

    const createCity = container.resolve(CreateCityService);

    const city = await createCity.execute({
      name,
      state_id,
    });

    return response.json(city);
  }
}
