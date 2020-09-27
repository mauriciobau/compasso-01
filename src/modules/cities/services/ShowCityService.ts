/* eslint-disable no-empty-function */
import { injectable, inject } from 'tsyringe';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';

import City from '@modules/cities/infra/typeorm/entities/City';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  name: string;
}

@injectable()
class ShowCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<City> {
    const city = await this.citiesRepository.findByCityName(name);

    if (!city) {
      throw new AppError('Não foi possível encontrar cidade!');
    }

    return city;
  }
}

export default ShowCityService;
