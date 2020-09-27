import FakeCitiesRepository from '../../cities/repositories/fake/FakeCitiesRepository';
import AppError from '../../../shared/errors/AppError';

import FakeClientsRepository from '../repositories/fake/FakeClientsRepository';
import CreateClientService from './CreateClientService';

let fakeCitiesRepository: FakeCitiesRepository;
let fakeClientsRepository: FakeClientsRepository;
let createClient: CreateClientService;

describe('CreateClient', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    fakeClientsRepository = new FakeClientsRepository();
    createClient = new CreateClientService(
      fakeCitiesRepository,
      fakeClientsRepository,
    );
  });

  it('should be able to create a new client', async () => {
    const city = await fakeCitiesRepository.create({
      name: 'City Name',
      state_id: 'state-id',
    });

    const client = await createClient.execute({
      name: 'Cliente Teste',
      sex: 'Masculino',
      birth_date: new Date(1989, 1, 25),
      age: 31,
      city_id: city.id,
    });

    expect(client).toHaveProperty('id');
  });

  it('should not be able to create a new client with same name', async () => {
    const city = await fakeCitiesRepository.create({
      name: 'City Name',
      state_id: 'state-id',
    });

    const client = await createClient.execute({
      name: 'Cliente Teste',
      sex: 'Masculino',
      birth_date: new Date(1989, 1, 25),
      age: 31,
      city_id: city.id,
    });

    await expect(
      createClient.execute({
        name: 'Cliente Teste',
        sex: 'Masculino',
        birth_date: new Date(1989, 1, 25),
        age: 31,
        city_id: city.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new client unnamed', async () => {
    const city = await fakeCitiesRepository.create({
      name: 'City Name',
      state_id: 'state-id',
    });

    await expect(
      createClient.execute({
        name: '',
        sex: 'Masculino',
        birth_date: new Date(1989, 1, 25),
        age: 31,
        city_id: city.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new client without sex', async () => {
    const city = await fakeCitiesRepository.create({
      name: 'City Name',
      state_id: 'state-id',
    });

    await expect(
      createClient.execute({
        name: 'Cliente Teste',
        sex: '',
        birth_date: new Date(1989, 1, 25),
        age: 31,
        city_id: city.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new client with an incomparable age with date of birth', async () => {
    const city = await fakeCitiesRepository.create({
      name: 'City Name',
      state_id: 'state-id',
    });

    await expect(
      createClient.execute({
        name: 'Cliente Teste',
        sex: 'Masculino',
        birth_date: new Date(1989, 1, 25),
        age: 5,
        city_id: city.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new client with unexist city', async () => {
    const city = await fakeCitiesRepository.create({
      name: 'City Name',
      state_id: 'state-id',
    });

    await expect(
      createClient.execute({
        name: 'Cliente Teste',
        sex: 'Masculino',
        birth_date: new Date(1989, 1, 25),
        age: 31,
        city_id: 'unexisted-city',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
