import FakeStatesRepository from '../../states/repositories/fake/FakeStatesRepository';
import AppError from '../../../shared/errors/AppError';

import FakeCitiesRepository from '../repositories/fake/FakeCitiesRepository';
import CreateCityService from './CreateCityService';

let fakeStateRepository: FakeStatesRepository;
let fakeCitiesRepository: FakeCitiesRepository;
let createCity: CreateCityService;

describe('CreateCity', () => {
  beforeEach(() => {
    fakeStateRepository = new FakeStatesRepository();
    fakeCitiesRepository = new FakeCitiesRepository();
    createCity = new CreateCityService(
      fakeStateRepository,
      fakeCitiesRepository,
    );
  });

  it('should be able to create a new city', async () => {
    const state = await fakeStateRepository.create({
      name: 'State Name',
    });

    const city = await createCity.execute({
      name: 'Bento Gonçalves',
      state_id: state.id,
    });

    expect(city).toHaveProperty('id');
  });

  it('should not be able to create a new city with same name from another', async () => {
    const state = await fakeStateRepository.create({
      name: 'State Name',
    });

    await createCity.execute({
      name: 'Bento Gonçalves',
      state_id: state.id,
    });

    await expect(
      createCity.execute({
        name: 'Bento Gonçalves',
        state_id: state.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new city with wrong state id', async () => {
    await expect(
      createCity.execute({
        name: 'Bento Gonçalves',
        state_id: 'wrong-state-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new unnamed city', async () => {
    await expect(
      createCity.execute({
        name: '',
        state_id: 'state-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
