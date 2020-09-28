import { uuid } from 'uuidv4';

import IClientsRepository from '../IClientsRepository';
import ICreateClientsDTO from '../../dtos/ICreateClientsDTO';

import Client from '../../infra/typeorm/entities/Client';

class FakeClientsRepository implements IClientsRepository {
  private clients: Client[] = [];

  public async findById(id: string): Promise<Client | undefined> {
    const findClient = this.clients.find(client => client.id === id);

    return findClient;
  }

  public async findByName(name: string): Promise<Client | undefined> {
    const findClient = this.clients.find(client => client.name === name);

    return findClient;
  }

  public async create(clientData: ICreateClientsDTO): Promise<Client> {
    const client = new Client();

    Object.assign(client, { id: uuid() }, clientData);

    this.clients.push(client);

    return client;
  }

  public async update(client: Client): Promise<Client | undefined> {
    const findIndex = this.clients.findIndex(
      findClient => findClient.id === client.id,
    );

    this.clients[findIndex] = client;

    return client;
  }

  public async delete(id: string): Promise<any> {
    const findIndex = this.clients.findIndex(
      findClient => findClient.id === id,
    );

    this.clients.splice(findIndex, 1);
  }
}

export default FakeClientsRepository;
