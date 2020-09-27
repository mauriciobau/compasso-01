/* eslint-disable no-empty-function */
import { injectable, inject } from 'tsyringe';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  name: string;
}

@injectable()
class ShowClientByNameService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Client> {
    const client = await this.clientsRepository.findByName(name);

    if (!client) {
      throw new AppError('Não foi possível encontrar cliente!');
    }

    return client;
  }
}

export default ShowClientByNameService;
