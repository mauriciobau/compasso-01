import FakeCitiesRepository from '../../cities/repositories/fake/FakeCitiesRepository';
import AppError from '../../../shared/errors/AppError';

import FakeClientsRepository from '../repositories/fake/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import ShowClientByIdService from './ShowClientByIdService';

let fakeCitiesRepository: FakeCitiesRepository;
let fakeClientsRepository: FakeClientsRepository;
let createClient: CreateClientService;
let showClientByIdService: ShowClientByIdService;

describe('Show Client by ID', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    fakeClientsRepository = new FakeClientsRepository();
    createClient = new CreateClientService(
      fakeCitiesRepository,
      fakeClientsRepository,
    );
    showClientByIdService = new ShowClientByIdService(fakeClientsRepository);
  });

  it('should be able to show client by id', async () => {
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

    const findClient = await showClientByIdService.execute({ id: client.id });

    expect(findClient.name).toBe('Cliente Teste');
  });

  it('should not be able to show client by unexisted client id', async () => {
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
      showClientByIdService.execute({ id: 'unexisted-client-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
