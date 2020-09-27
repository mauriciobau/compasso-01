import City from '../infra/typeorm/entities/City';
import ICreateCitiesDTO from '../dtos/ICreateCitiesDTO';

export default interface ICitiesRepository {
  findById(id: string): Promise<City | undefined>;
  findByCityName(name: string): Promise<City | undefined>;
  create(data: ICreateCitiesDTO): Promise<City>;
}
