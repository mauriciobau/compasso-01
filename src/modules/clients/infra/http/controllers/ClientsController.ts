/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateClientService from '@modules/clients/services/CreateClientService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';
import DeleteClientService from '@modules/clients/services/DeleteClientService';
import ShowClientByIdService from '@modules/clients/services/ShowClientByIdService';

export default class ClientController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const showClientById = container.resolve(ShowClientByIdService);

    const client = await showClientById.execute({ id });

    return response.json(client);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, sex, birth_date, age, city_id } = request.body;

    const createClient = container.resolve(CreateClientService);

    const client = await createClient.execute({
      name,
      sex,
      birth_date,
      age,
      city_id,
    });

    return response.json(client);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { client_id, name, sex, birth_date, age, city_id } = request.body;

    const updateClient = container.resolve(UpdateClientService);

    const clientUpdated = await updateClient.execute({
      client_id,
      name,
      sex,
      birth_date,
      age,
      city_id,
    });

    return response.json(clientUpdated);
  }

  public async delete(request: Request): Promise<any> {
    const { client_id } = request.params;

    const deleteClient = container.resolve(DeleteClientService);

    return deleteClient.execute({ client_id });
  }
}
