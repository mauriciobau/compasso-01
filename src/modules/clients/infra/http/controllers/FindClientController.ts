/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowClientByNameService from '@modules/clients/services/ShowClientByNameService';

export default class FindClientController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const showClientByName = container.resolve(ShowClientByNameService);

    const client = await showClientByName.execute({ name });

    return response.json(client);
  }
}
