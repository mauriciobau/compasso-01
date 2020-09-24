import AppError from '../../../shared/errors/AppError';

import FakeStatesRepository from '../repositories/fake/FakeStatesRepository';
import CreateStateService from './CreateStateService';
import ShowStateService from './ShowStateService';

let fakeStatesRepository: FakeStatesRepository;
let createState: CreateStateService;
let showState: ShowStateService;

describe('ShowState', () => {
  beforeEach(() => {
    fakeStatesRepository = new FakeStatesRepository();
    createState = new CreateStateService(
      fakeStatesRepository,
    );
    showState = new ShowStateService(
      fakeStatesRepository,
    );
  });

  it('should be able to show states', async () => {
    const state = await createState.execute({
      name: 'Rio Grande do Sul',
    });

    const states = await showState.execute();

    expect(states[0].name).toBe('Rio Grande do Sul');
  });
});
