/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCitiesService from '@modules/states/services/ListCitiesService';

export default class ListCitiesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { stateName } = request.params;
    const listCities = container.resolve(ListCitiesService);

    const cities = await listCities.execute({ stateName });

    return response.json(cities);
  }
}
