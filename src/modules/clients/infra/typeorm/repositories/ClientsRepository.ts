import { Entity, getRepository, Repository } from 'typeorm';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ICreateClientsDTO from '@modules/clients/dtos/ICreateClientsDTO';

import Client from '../entities/Client';

class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async findById(id: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne(id);

    return client;
  }

  public async findByName(name: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({
      where: { name },
      relations: ['city'],
    });

    return client;
  }

  public async create(clientData: ICreateClientsDTO): Promise<Client> {
    const client = this.ormRepository.create(clientData);

    await this.ormRepository.save(client);

    return client;
  }

  public async update(client: Client): Promise<Client> {
    return this.ormRepository.save(client);
  }

  public async delete(id: string): Promise<any> {
    // Typeorm apresentando problema de retorno ao deletar.
    // Mas a execução do delete é realizada.
    return this.ormRepository.delete(id);
    // const retorno = await this.ormRepository
    //   .createQueryBuilder()
    //   .delete()
    //   .from(Client)
    //   .where('id = :id', { id })
    //   .returning('*')
    //   .execute();
    // const retorno = await this.ormRepository.query(
    //   `DELETE FROM clients WHERE id = '${id}';`,
    // );
  }
}

export default ClientsRepository;
