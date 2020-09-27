import FakeCitiesRepository from '../../cities/repositories/fake/FakeCitiesRepository';
import AppError from '../../../shared/errors/AppError';

import FakeClientsRepository from '../repositories/fake/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import ShowClientByNameService from './ShowClientByNameService';

let fakeCitiesRepository: FakeCitiesRepository;
let fakeClientsRepository: FakeClientsRepository;
let createClient: CreateClientService;
let showClientByNameService: ShowClientByNameService;

describe('Show Client by Name', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    fakeClientsRepository = new FakeClientsRepository();
    createClient = new CreateClientService(
      fakeCitiesRepository,
      fakeClientsRepository,
    );
    showClientByNameService = new ShowClientByNameService(
      fakeClientsRepository,
    );
  });

  it('should be able to show client by name', async () => {
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

    const findClient = await showClientByNameService.execute({
      name: client.name,
    });

    expect(findClient.name).toBe('Cliente Teste');
  });

  it('should not be able to show client by unexisted client name', async () => {
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
      showClientByNameService.execute({ name: 'unexisted-client-name' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
