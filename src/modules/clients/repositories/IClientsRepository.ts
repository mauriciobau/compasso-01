import Client from '../infra/typeorm/entities/Client';
import ICreateClientsDTO from '../dtos/ICreateClientsDTO';

export default interface IClientsRepository {
  findById(id: string): Promise<Client | undefined>;
  findByName(name: string): Promise<Client | undefined>;
  create(data: ICreateClientsDTO): Promise<Client>;
  update(client: Client): Promise<Client | undefined>;
  delete(id: string): Promise<void>;
}
