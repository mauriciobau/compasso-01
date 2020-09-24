import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IStatesRepository from '@modules/states/repositories/IStatesRepository';

import State from '@modules/states/infra/typeorm/entities/State';

interface IRequest {
  name: string;
}

@injectable()
class CreateStateService {
  constructor(
    @inject('StatesRepository')
    private statesRepository: IStatesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<State> {
    if(!name){
      throw new AppError('Insira o nome do estado.')
    }

    const checkStateExists = await this.statesRepository.findByName(name);

    if (checkStateExists) {
      throw new AppError('Estado já cadastrado.')
    }

    const state = await this.statesRepository.create({
      name,
    });

    return state;
  }
}

export default CreateStateService;
