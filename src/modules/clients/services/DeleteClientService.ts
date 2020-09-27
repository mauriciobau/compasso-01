/* eslint-disable camelcase */
/* eslint-disable no-empty-function */
import { injectable, inject } from 'tsyringe';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import AppError from '../../../shared/errors/AppError';

interface IRequest {
  client_id: string;
}

@injectable()
class DeleteClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({ client_id }: IRequest): Promise<void> {
    const client = await this.clientsRepository.findById(client_id);

    if (!client) {
      throw new AppError('Não foi possível encontrar cliente!');
    }

    await this.clientsRepository.delete(client_id);
  }
}
export default DeleteClientService;
