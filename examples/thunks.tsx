import { createAsyncThunk } from '@reduxjs/toolkit';
import { SupportedLanguageEnum } from 'utils/enums';
import i18n from 'utils/language/languangeClient';
import {
  AdvanceGameRequest,
  AdvanceGameResponse,
  CompareGameVariationsRequest,
  CompareGameVariationsResponse,
  CreateGameRequest,
  CreateGameResponse,
  CreateWordRequest,
  CreateWordResponseThunk,
  DeleteGameRequest,
  DeleteGameResponse,
  DeleteWordRequest,
  DeleteWordResponse,
  ExportGameRequest,
  GetGameRequest,
  GetGameResponse,
  GetGamesRequest,
  GetGamesResponse,
  GetGameStateRequest,
  GetGameStateResponse,
  GetSupportedLanguagesResponse,
  GetWordsResponse,
  KickPlayerRequest,
} from '../models/adminModels';
import {
  GameServiceAdvanceGame,
  GameServiceCompareGameVariations,
  GameServiceCreateGame,
  GameServiceDeleteGame,
  GameServiceExportGame,
  GameServiceGetAllGames,
  GameServiceGetGameDetails,
  GameServiceGetGameState,
  GameServiceKickPlayer,
} from '../services/game.service';
import { LanguageServiceGetLanguage } from 'redux/services/language.service';
import {
  WordServiceCreateWord,
  WordServiceDeleteWord,
  WordServiceGetAllWords,
} from 'redux/services/word.service';

export const createGameThunk = createAsyncThunk<
  CreateGameResponse,
  CreateGameRequest
>('admin/createGame', async (requestData, thunkAPI) => {
  const response = await GameServiceCreateGame(requestData);
  return response.data;
});

export const deleteGameThunk = createAsyncThunk<
  DeleteGameResponse,
  DeleteGameRequest
>('admin/deleteGame', async (request, thunkAPI) => {
  await GameServiceDeleteGame(request);
});

export const getAllGamesThunk = createAsyncThunk<
  GetGamesResponse,
  GetGamesRequest
>('admin/getAllGames', async (pagedList, thunkAPI) => {
  var response = await GameServiceGetAllGames(pagedList);
  return response.data;
});

export const getGameDetailsThunk = createAsyncThunk<
  GetGameResponse,
  GetGameRequest
>('admin/getGameDetails', async (game, thunkAPI) => {
  var response = await GameServiceGetGameDetails(game);
  i18n.changeLanguage(
    SupportedLanguageEnum[
      response.data.supportedlanguageId as SupportedLanguageEnum
    ]
  );

  return response.data;
});

export const getGameDetailsIntervalThunk = createAsyncThunk<
  GetGameResponse,
  GetGameRequest
>('admin/getGameDetails', async (game, thunkAPI) => {
  var response = await GameServiceGetGameDetails(game);
  i18n.changeLanguage(
    SupportedLanguageEnum[
      response.data.supportedlanguageId as SupportedLanguageEnum
    ]
  );

  return response.data;
});

export const getAllWordsThunk = createAsyncThunk<GetWordsResponse>(
  'admin/getWords',
  async (thunkAPI) => {
    var response = await WordServiceGetAllWords();
    return response.data;
  }
);

export const createWordThunk = createAsyncThunk<
  CreateWordResponseThunk,
  CreateWordRequest
>('admin/createWord', async (request, thunkAPI) => {
  var response = await WordServiceCreateWord(request);
  return {
    translations: request.translations,
    wordId: response.data.wordId,
    wordColor: response.data.wordColor,
  };
});

export const deleteWordThunk = createAsyncThunk<
  DeleteWordResponse,
  DeleteWordRequest
>('admin/deleteWord', async (deleteWord, thunkAPI) => {
  await WordServiceDeleteWord(deleteWord);
  return { id: deleteWord.id };
});

export const advanceGameThunk = createAsyncThunk<
  AdvanceGameResponse,
  AdvanceGameRequest
>('admin/advanceGame', async (game, thunkAPI) => {
  var response = await GameServiceAdvanceGame(game);
  return response.data;
});

export const getGameStateThunk = createAsyncThunk<
  GetGameStateResponse,
  GetGameStateRequest
>('admin/gameWords', async (game, thunkAPI) => {
  var response = await GameServiceGetGameState(game);
  return response.data;
});

export const compareGameStateThunk = createAsyncThunk<
  CompareGameVariationsResponse,
  CompareGameVariationsRequest
>('admin/compareGameVariations', async (game, thunkAPI) => {
  var response = await GameServiceCompareGameVariations(game);
  return response.data;
});

export const getLanguagesThunk =
  createAsyncThunk<GetSupportedLanguagesResponse>(
    'admin/getLanguages',
    async (thunkAPI) => {
      var response = await LanguageServiceGetLanguage();
      return response.data;
    }
  );

export const exportGameFileThunk = createAsyncThunk<
  undefined,
  ExportGameRequest
>('admin/exportFile', async (game, thunkAPI) => {
  await GameServiceExportGame(game);
  return undefined;
});

export const kickPlayerThunk = createAsyncThunk<undefined, KickPlayerRequest>(
  'admin/kick-player',
  async (data, thunkAPI) => {
    var response = await GameServiceKickPlayer(data);
    return response.data;
  }
);
