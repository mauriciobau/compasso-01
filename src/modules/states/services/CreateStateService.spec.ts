import AppError from '../../../shared/errors/AppError';

import FakeStatesRepository from '../repositories/fake/FakeStatesRepository';
import CreateStateService from './CreateStateService';

let fakeStatesRepository: FakeStatesRepository;
let createState: CreateStateService;

describe('CreateState', () => {
  beforeEach(() => {
    fakeStatesRepository = new FakeStatesRepository();
    createState = new CreateStateService(fakeStatesRepository);
  });

  it('should be able to create a new state', async () => {
    const state = await createState.execute({
      name: 'Rio Grande do Sul',
    });

    expect(state).toHaveProperty('id');
  });

  it('should not be able to create a new state with same name from another', async () => {
    await createState.execute({
      name: 'Rio Grande do Sul',
    });

    await expect(
      createState.execute({
        name: 'Rio Grande do Sul',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new unnamed state', async () => {
    await expect(
      createState.execute({
        name: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
