import FakeCitiesRepository from '../../cities/repositories/fake/FakeCitiesRepository';
import AppError from '../../../shared/errors/AppError';

import FakeClientsRepository from '../repositories/fake/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import UpdateClientService from './UpdateClientService';

let fakeCitiesRepository: FakeCitiesRepository;
let fakeClientsRepository: FakeClientsRepository;
let createClient: CreateClientService;
let updateClient: UpdateClientService;

describe('UpdateClient', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    fakeClientsRepository = new FakeClientsRepository();
    createClient = new CreateClientService(
      fakeCitiesRepository,
      fakeClientsRepository,
    );
    updateClient = new UpdateClientService(
      fakeCitiesRepository,
      fakeClientsRepository,
    );
  });

  it('should be able to update a client', async () => {
    const city = await fakeCitiesRepository.create({
      name: 'City Name',
      state_id: 'state-id',
    });

    const city2 = await fakeCitiesRepository.create({
      name: 'City Name2',
      state_id: 'state-id',
    });

    const client = await createClient.execute({
      name: 'Cliente Teste',
      sex: 'Masculino',
      birth_date: new Date(1989, 1, 25),
      age: 31,
      city_id: city.id,
    });

    const clientUpdated = await updateClient.execute({
      client_id: client.id,
      name: 'Cliente Teste2',
      sex: 'Feminino',
      birth_date: new Date(1990, 3, 17),
      age: 30,
      city_id: city2.id,
    });

    await expect(clientUpdated.id).toBe(client.id);
    await expect(clientUpdated.name).toBe('Cliente Teste2');
    await expect(clientUpdated.sex).toBe('Feminino');
    await expect(clientUpdated.birth_date).toEqual(new Date(1990, 3, 17));
    await expect(clientUpdated.age).toBe(30);
    await expect(clientUpdated.city_id).toBe(city2.id);
  });

  it('should not be able to update a client with same name from antother', async () => {
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

    const client2 = await createClient.execute({
      name: 'Teste Cliente',
      sex: 'Masculino',
      birth_date: new Date(1992, 5, 28),
      age: 28,
      city_id: city.id,
    });

    await expect(
      updateClient.execute({
        client_id: client.id,
        name: 'Teste Cliente',
        sex: 'Masculino',
        birth_date: new Date(1989, 1, 25),
        age: 31,
        city_id: city.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a new client with an incomparable age with date of birth', async () => {
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
      updateClient.execute({
        client_id: client.id,
        name: 'Teste Cliente',
        sex: 'Masculino',
        birth_date: new Date(1989, 1, 25),
        age: 20,
        city_id: city.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new client with unexist city', async () => {
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
      updateClient.execute({
        client_id: client.id,
        name: 'Cliente Teste2',
        sex: 'Feminino',
        birth_date: new Date(1990, 3, 17),
        age: 30,
        city_id: 'unexisted-city',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
