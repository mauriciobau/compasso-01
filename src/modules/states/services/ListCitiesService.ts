import { injectable, inject } from 'tsyringe';

import IStatesRepository from '@modules/states/repositories/IStatesRepository';

import State from '@modules/states/infra/typeorm/entities/State';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  stateName: string;
}

@injectable()
class ListCitiesService {
  constructor(
    @inject('StatesRepository')
    private statesRepository: IStatesRepository,
  ) {}

  public async execute({ stateName }: IRequest): Promise<State | undefined> {
    const state = await this.statesRepository.findByName(stateName);

    if (!state) {
      throw new AppError('Estado não encontrado!');
    }

    const states = await this.statesRepository.findByName(stateName);

    if (!state.cities.length) {
      throw new AppError('Não foi possível encontrar nenhuma cidade!');
    }

    return states;
  }
}

export default ListCitiesService;
