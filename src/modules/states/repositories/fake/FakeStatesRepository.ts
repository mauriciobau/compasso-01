import { uuid } from 'uuidv4';

import IStatesRepository from '../../repositories/IStatesRepository';
import ICreateStateDTO from '../../dtos/ICreateStateDTO';

import State from '../../infra/typeorm/entities/State';

class FakeStatesRepository implements IStatesRepository {
  private states: State[] = [];

  public async findById(id: string): Promise<State | undefined> {
    const findState = this.states.find(state => state.id === id);

    return findState;
  }

  public async findByName(name: string): Promise<State | undefined> {
    const findState = this.states.find(user => user.name === name);

    return findState;
  }

  public async create(stateData: ICreateStateDTO): Promise<State> {
    const state = new State();

    Object.assign(state, { id: uuid() }, stateData);

    this.states.push(state);

    return state;
  }

  public async showAll(): Promise<State[]> {
    return this.states;
  }
}

export default FakeStatesRepository;
