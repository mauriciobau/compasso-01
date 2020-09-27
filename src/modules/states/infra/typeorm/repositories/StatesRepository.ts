import { getRepository, Repository } from 'typeorm';

import City from '@modules/cities/infra/typeorm/entities/City';
import IStatesRepository from '../../../repositories/IStatesRepository';
import ICreateStateDTO from '../../../dtos/ICreateStateDTO';

import State from '../entities/State';

class StatesRepository implements IStatesRepository {
  private ormRepository: Repository<State>;

  constructor() {
    this.ormRepository = getRepository(State);
  }

  public async findById(id: string): Promise<State | undefined> {
    const state = await this.ormRepository.findOne(id);

    return state;
  }

  public async findByName(name: string): Promise<State | undefined> {
    const state = await this.ormRepository.findOne({
      where: { name },
      relations: ['cities'],
    });

    return state;
  }

  public async create(stateData: ICreateStateDTO): Promise<State> {
    const state = this.ormRepository.create(stateData);

    await this.ormRepository.save(state);

    return state;
  }

  public async showAll(): Promise<State[]> {
    const states = this.ormRepository.find();

    return states;
  }
}

export default StatesRepository;
