/* eslint-disable no-empty-function */
/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import { isDate, isFuture, differenceInYears } from 'date-fns';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  client_id: string;
  name: string;
  sex: string;
  birth_date: Date;
  age: number;
  city_id: string;
}

@injectable()
class UpdateClientService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    client_id,
    name,
    sex,
    birth_date,
    age,
    city_id,
  }: IRequest): Promise<Client> {
    const client = await this.clientsRepository.findById(client_id);

    if (!client) {
      throw new AppError('Não foi possível encontrar cliente!');
    }

    const checkCityExists = await this.citiesRepository.findById(city_id);

    if (!checkCityExists) {
      throw new AppError('Cidade não encontrada.');
    }

    if (!name) {
      throw new AppError('Insira o nome do cliente.');
    }

    if (!sex) {
      throw new AppError('Insira o sexo do cliente.');
    }

    if (!birth_date) {
      throw new AppError('Insira a data de nascimento do cliente.');
    }

    if (isFuture(new Date(birth_date))) {
      throw new AppError('Não pode ser data futura.');
    }

    if (differenceInYears(new Date(birth_date), Date.now()) !== -age) {
      throw new AppError(
        'Idade informada não corresponde com a data de nascimento.',
      );
    }

    if (!age) {
      throw new AppError('Insira a idade do cliente.');
    }

    const checkClientNameExists = await this.clientsRepository.findByName(name);

    if (checkClientNameExists) {
      throw new AppError('Nome do cliente já cadastrada.');
    }

    client.name = name;
    client.sex = sex;
    client.birth_date = new Date(birth_date);
    client.age = age;
    client.city_id = city_id;

    await this.clientsRepository.update(client);

    return client;
  }
}

export default UpdateClientService;
