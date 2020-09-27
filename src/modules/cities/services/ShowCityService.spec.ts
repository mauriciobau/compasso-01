import AppError from '../../../shared/errors/AppError';

import FakeStatesRepository from '../../states/repositories/fake/FakeStatesRepository';
import FakeCitiesRepository from '../repositories/fake/FakeCitiesRepository';
import CreateCityService from './CreateCityService';
import ShowCityService from './ShowCityService';

let fakeStateRepository: FakeStatesRepository;
let fakeCitiesRepository: FakeCitiesRepository;
let createCity: CreateCityService;
let showCity: ShowCityService;

describe('ShowCity', () => {
  beforeEach(() => {
    fakeStateRepository = new FakeStatesRepository();
    fakeCitiesRepository = new FakeCitiesRepository();
    createCity = new CreateCityService(
      fakeStateRepository,
      fakeCitiesRepository,
    );
    showCity = new ShowCityService(fakeCitiesRepository);
  });

  it('should be able to show city by name', async () => {
    const state = await fakeStateRepository.create({
      name: 'State Name',
    });

    const city = await createCity.execute({
      name: 'Bento Gonçalves',
      state_id: state.id,
    });

    const findCity = await showCity.execute({ name: city.name });

    expect(findCity.name).toBe('Bento Gonçalves');
  });

  it('should not be able to show city by name', async () => {
    const state = await fakeStateRepository.create({
      name: 'State Name',
    });

    const city = await createCity.execute({
      name: 'Bento Gonçalves',
      state_id: state.id,
    });

    await expect(
      showCity.execute({ name: 'Non-existent-city' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
