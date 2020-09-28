import { getRepository, Repository } from 'typeorm';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import ICreateCitiesDTO from '@modules/cities/dtos/ICreateCitiesDTO';

import City from '../entities/City';

class CitiesRepository implements ICitiesRepository {
  private ormRepository: Repository<City>;

  constructor() {
    this.ormRepository = getRepository(City);
  }

  public async findById(id: string): Promise<City | undefined> {
    const city = await this.ormRepository.findOne(id);

    return city;
  }

  public async findByCityName(name: string): Promise<City | undefined> {
    const city = await this.ormRepository.findOne({
      where: { name },
      relations: ['state', 'clients'],
    });

    return city;
  }

  public async create(cityData: ICreateCitiesDTO): Promise<City> {
    const city = this.ormRepository.create(cityData);

    await this.ormRepository.save(city);

    return city;
  }
}

export default CitiesRepository;
