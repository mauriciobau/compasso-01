import AppError from '../../../shared/errors/AppError';

import FakeStatesRepository from '../repositories/fake/FakeStatesRepository';
import FakeCitiesRepository from '../../cities/repositories/fake/FakeCitiesRepository';
import CreateCityService from '../../cities/services/CreateCityService';
import ListCitiesService from './ListCitiesService';

let fakeStateRepository: FakeStatesRepository;
let fakeCitiesRepository: FakeCitiesRepository;
let createCity: CreateCityService;
let listCities: ListCitiesService;

describe('Show Cities from State', () => {
  beforeEach(() => {
    fakeStateRepository = new FakeStatesRepository();
    fakeCitiesRepository = new FakeCitiesRepository();
    createCity = new CreateCityService(
      fakeStateRepository,
      fakeCitiesRepository,
    );
    listCities = new ListCitiesService(fakeStateRepository);
  });

  it('should be able to show cities by state name', async () => {
    const state = await fakeStateRepository.create({
      name: 'State Name',
    });

    const city = await createCity.execute({
      name: 'Bento Gonçalves',
      state_id: state.id,
    });

    state.cities = [];
    state.cities.push(city);

    const findCities = await listCities.execute({ stateName: state.name });

    expect(findCities?.cities[0].name).toBe('Bento Gonçalves');
  });

  it('should not be able to show city by state name', async () => {
    const state = await fakeStateRepository.create({
      name: 'State Name',
    });

    const city = await createCity.execute({
      name: 'Bento Gonçalves',
      state_id: state.id,
    });

    await expect(
      listCities.execute({ stateName: 'Non-existent-state' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to show city by state whidout city', async () => {
    const state = await fakeStateRepository.create({
      name: 'State Name',
    });

    const city = await createCity.execute({
      name: 'Bento Gonçalves',
      state_id: state.id,
    });

    state.cities = [];

    await expect(
      listCities.execute({ stateName: state.id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
