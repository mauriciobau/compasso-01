import { uuid } from 'uuidv4';

import ICitiesRepository from '../ICitiesRepository';
import ICreateCitiesDTO from '../../dtos/ICreateCitiesDTO';

import City from '../../infra/typeorm/entities/City';

class FakeCitiesRepository implements ICitiesRepository {
  private cities: City[] = [];

  public async findById(id: string): Promise<City | undefined> {
    const findCity = this.cities.find(city => city.id === id);

    return findCity;
  }

  public async findByCityName(cityName: string): Promise<City | undefined> {
    const findCity = this.cities.find(city => city.name === cityName);

    return findCity;
  }

  public async create(cityData: ICreateCitiesDTO): Promise<City> {
    const city = new City();

    Object.assign(city, { id: uuid() }, cityData);

    this.cities.push(city);

    return city;
  }
}

export default FakeCitiesRepository;
