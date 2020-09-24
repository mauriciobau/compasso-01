import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IStatesRepository from '@modules/states/repositories/IStatesRepository';

import State from '@modules/states/infra/typeorm/entities/State';

@injectable()
class ShowStatesService {
  constructor(
    @inject('StatesRepository')
    private statesRepository: IStatesRepository,
  ) {}

  public async execute(): Promise<State[]> {

    const states = await this.statesRepository.showAll();

    if(!states){
      throw new AppError('Não foi possível encontrar nenhum estado!');
    }

    return states;
  }
}

export default ShowStatesService;
