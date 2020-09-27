/* eslint-disable no-empty-function */
/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';

import City from '@modules/cities/infra/typeorm/entities/City';
import IStatesRepository from '@modules/states/repositories/IStatesRepository';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  name: string;
  state_id: string;
}

@injectable()
class CreateCityService {
  constructor(
    @inject('StatesRepository')
    private statesRepository: IStatesRepository,

    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute({ name, state_id }: IRequest): Promise<City> {
    if (!name) {
      throw new AppError('Insira o nome da cidade.');
    }

    const checkStateExists = await this.statesRepository.findById(state_id);

    if (!checkStateExists) {
      throw new AppError('Estado não encontrado.');
    }

    const checkCityExists = await this.citiesRepository.findByCityName(name);

    if (checkCityExists) {
      throw new AppError('Cidade já cadastrada.');
    }

    const city = await this.citiesRepository.create({
      name,
      state_id,
    });

    return city;
  }
}

export default CreateCityService;
