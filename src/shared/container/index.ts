import { container } from 'tsyringe';

import IUsersRepository from '@modules/states/repositories/IStatesRepository';
import StatesRepository from '@modules/states/infra/typeorm/repositories/StatesRepository';

container.registerSingleton<IUsersRepository>(
  'StatesRepository',
  StatesRepository,
);
