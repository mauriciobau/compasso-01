import FakeCitiesRepository from '../../cities/repositories/fake/FakeCitiesRepository';
import AppError from '../../../shared/errors/AppError';

import FakeClientsRepository from '../repositories/fake/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import ShowClientByIdService from './ShowClientByIdService';
import DeleteClientService from './DeleteClientService';

let fakeCitiesRepository: FakeCitiesRepository;
let fakeClientsRepository: FakeClientsRepository;
let createClient: CreateClientService;
let showClientByIdService: ShowClientByIdService;
let deleteClientService: DeleteClientService;

describe('Delete Client by ID', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    fakeClientsRepository = new FakeClientsRepository();
    createClient = new CreateClientService(
      fakeCitiesRepository,
      fakeClientsRepository,
    );
    deleteClientService = new DeleteClientService(fakeClientsRepository);
    showClientByIdService = new ShowClientByIdService(fakeClientsRepository);
  });

  it('should be able to delete client by ID', async () => {
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

    await deleteClientService.execute({ client_id: client.id });

    await expect(
      showClientByIdService.execute({
        id: client.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete client by unexisted client id', async () => {
    await expect(
      deleteClientService.execute({ client_id: 'unexisted client id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
