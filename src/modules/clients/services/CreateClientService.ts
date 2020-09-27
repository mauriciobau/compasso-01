/* eslint-disable no-empty-function */
/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import { isDate, isFuture, differenceInYears } from 'date-fns';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  name: string;
  sex: string;
  birth_date: Date;
  age: number;
  city_id: string;
}

@injectable()
class CreateClientService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    name,
    sex,
    birth_date,
    age,
    city_id,
  }: IRequest): Promise<Client> {
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

    const checkCityExists = await this.citiesRepository.findById(city_id);

    if (!checkCityExists) {
      throw new AppError('Cidade não encontrada.');
    }

    const checkClientExists = await this.clientsRepository.findByName(name);

    if (checkClientExists) {
      throw new AppError('Cliente já cadastrada.');
    }

    const city = await this.clientsRepository.create({
      name,
      sex,
      birth_date,
      age,
      city_id,
    });

    return city;
  }
}

export default CreateClientService;
