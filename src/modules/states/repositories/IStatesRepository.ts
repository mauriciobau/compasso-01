import State from '../infra/typeorm/entities/State';
import ICreateStateDTO from '../dtos/ICreateStateDTO';

export default interface IStatesRepository {
  findById(id: string): Promise<State | undefined>;
  findByName(name: string): Promise<State | undefined>;
  showAll(): Promise<State[] | undefined>;
  create(data: ICreateStateDTO): Promise<State>;
}
