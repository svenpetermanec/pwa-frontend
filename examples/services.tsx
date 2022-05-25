import {
  AdvanceGameRequest,
  CompareGameVariationsRequest,
  CreateGameRequest,
  DeleteGameRequest,
  ExportGameRequest,
  GetGameRequest,
  GetGamesRequest,
  GetGameStateRequest,
  KickPlayerRequest,
} from '../models/adminModels';
import { gameServiceDefaultRoute, getGameServiceRoute } from './serviceRoutes';
import {
  executeDeleteRequest,
  executeDownloadGetRequest,
  executeGetRequest,
  executePostRequest,
} from './services';

export async function GameServiceCreateGame(requestData: CreateGameRequest) {
  return await executePostRequest(gameServiceDefaultRoute, requestData, {
    successMessage: 'Game created successfully',
    errorMessage: 'Error while trying to create a Game',
  });
}

export async function GameServiceDeleteGame(game: DeleteGameRequest) {
  return await executeDeleteRequest(getGameServiceRoute('/delete'), game, {
    successMessage: 'Game deleted successfully',
    errorMessage: 'Error while trying to delete a game',
  });
}

export async function GameServiceGetAllGames(pagedList: GetGamesRequest) {
  return await executeGetRequest(gameServiceDefaultRoute, {
    sortCriteria: pagedList.sortCriteria,
    page: pagedList.page,
    pageSize: pagedList.pageSize,
  });
}

export async function GameServiceGetGameDetails(game: GetGameRequest) {
  return await executeGetRequest(getGameServiceRoute('/details'), {
    gameId: game.gameId,
  });
}

export async function GameServiceAdvanceGame(game: AdvanceGameRequest) {
  return await executePostRequest(getGameServiceRoute('/advance'), game);
}

export async function GameServiceGetGameState(game: GetGameStateRequest) {
  return await executeGetRequest(getGameServiceRoute('/game-words'), {
    gameId: game.gameId,
  });
}

export async function GameServiceCompareGameVariations(
  game: CompareGameVariationsRequest
) {
  return await executeGetRequest(getGameServiceRoute('/compare-game'), {
    gameId: game.gameId,
  });
}

export async function GameServiceExportGame(game: ExportGameRequest) {
  return await executeDownloadGetRequest(
    getGameServiceRoute('/export-game'),
    {
      gameId: game.gameId,
    },
    {
      successMessage: 'Game exported successfully',
      errorMessage: 'Error while trying to export a Game',
    }
  );
}

export async function GameServiceKickPlayer(data: KickPlayerRequest) {
  return await executePostRequest(getGameServiceRoute('/kick-player'), data, {
    successMessage: 'Player kicked successfully',
    errorMessage: 'Error while trying to kick a player',
  });
}
