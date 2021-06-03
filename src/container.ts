import { Container } from 'inversify';
import TYPES from './types';

import { ResponseUtil } from './common/response';
import { GameController } from './controllers/game.controller';
import { DataSource } from './datasource';
import { GameRepository, IGameRepository } from './infrastructure/repositories/game.repository';
import { GameService,  IGameService } from './infrastructure/services/game.service';
import { GameValidator } from './infrastructure/validators/game.validator';

// containers and bindings
const container = new Container();

// singleton scoping classes
container.bind<DataSource>(TYPES.DataSource).to(DataSource).inSingletonScope();

// class bindings in concrete scope
container.bind<ResponseUtil>(TYPES.ResponseUtil).to(ResponseUtil);
container.bind<GameController>(TYPES.GameController).to(GameController);
container.bind<GameService>(TYPES.GameService).to(GameService);
container.bind<GameRepository>(TYPES.GameRepository).to(GameRepository);
container.bind<GameValidator>(TYPES.GameValidator).to(GameValidator);


// interface binding with classes
container.bind<IGameService>(TYPES.IGameService).to(GameService);
container.bind<IGameRepository>(TYPES.IGameRepository).to(GameRepository);

export default container;