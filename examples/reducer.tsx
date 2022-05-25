import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  CompareGameAllRoundData,
  CompareGameWordData,
  GetSupportedLanguagesResponseListData,
} from 'redux/models/adminModels';
import {
  GameBaseInfo,
  GameDetailedInfo,
  RoundDetailedInfo,
  TranslationWord,
} from 'utils/models';
import {
  GameRoundColorEnum,
  GameRoundStatusEnum,
  GameRoundTypeEnum,
  GameRoundVariationEnum,
  GameStatusEnum,
  NextRoundStateEnum,
} from '../../utils/enums';
import {
  advanceGameThunk,
  compareGameStateThunk,
  createWordThunk,
  deleteWordThunk,
  getAllGamesThunk,
  getAllWordsThunk,
  getGameDetailsIntervalThunk,
  getGameDetailsThunk,
  getGameStateThunk,
  getLanguagesThunk,
} from '../actions/adminActions';

export interface AdminReducerState {
  gameInfo: GameDetailedInfo;
  roundInfo: RoundDetailedInfo;
  translationWords: Array<TranslationWord>;
  gameTotalCount: number;
  gameList: Array<GameBaseInfo>;
  compareDataWords: Array<CompareGameWordData>;
  compareGameAllRoundData: Array<CompareGameAllRoundData>;
  supportedLanguages: Array<GetSupportedLanguagesResponseListData>;
}

const initialState: AdminReducerState = {
  gameInfo: {
    name: '',
    created: new Date().toDateString(),
    gameId: 0,
    gameKey: '',
    gameStatus: GameStatusEnum.Created,
    questions: [],
    words: [],
    playerCount: 0,
    supportedlanguageId: 0,
    gamePlayersData: [],
  },
  roundInfo: {
    wordTotalRoundCount: 0,
    wordFinishedRoundCount: 0,
    playerFinishedRoundCount: 0,
    nextRoundState: NextRoundStateEnum.NextRound,
    gameRoundColor: GameRoundColorEnum.All,
    gameRoundType: GameRoundTypeEnum.Single,
    gameRoundVariation: GameRoundVariationEnum.Present,
    gameRoundStatus: GameRoundStatusEnum.None,
  },
  translationWords: [],
  gameList: [],
  gameTotalCount: 0,
  compareDataWords: [],
  compareGameAllRoundData: [],
  supportedLanguages: [],
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    cleanupGameInfo(state) {
      state.gameInfo = {
        name: '',
        created: new Date().toDateString(),
        gameId: 0,
        gameKey: '',
        gameStatus: GameStatusEnum.Created,
        questions: [],
        words: [],
        playerCount: 0,
        supportedlanguageId: 0,
        gamePlayersData: [],
      };
      state.roundInfo = {
        wordTotalRoundCount: 0,
        wordFinishedRoundCount: 0,
        playerFinishedRoundCount: 0,
        nextRoundState: NextRoundStateEnum.NextRound,
        gameRoundColor: GameRoundColorEnum.All,
        gameRoundType: GameRoundTypeEnum.Single,
        gameRoundVariation: GameRoundVariationEnum.Present,
        gameRoundStatus: GameRoundStatusEnum.None,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllGamesThunk.fulfilled, (state, action) => {
      state.gameTotalCount = action.payload.games.totalCount;
      state.gameList = action.payload.games.items;
    });
    builder.addCase(getAllWordsThunk.fulfilled, (state, action) => {
      state.translationWords = action.payload.words;
    });

    builder.addCase(deleteWordThunk.fulfilled, (state, action) => {
      state.translationWords = state.translationWords.filter(
        (x) => x.wordId !== action.payload.id
      );
    });

    builder.addCase(createWordThunk.fulfilled, (state, action) => {
      state.translationWords.push({
        translations: action.payload.translations,
        wordId: action.payload.wordId,
        wordColor: action.payload.wordColor,
      });
    });

    builder.addCase(getGameStateThunk.fulfilled, (state, action) => {
      state.gameInfo.words = action.payload.gameWordData;
      state.gameInfo.playerCount = action.payload.playerCount;
      state.gameInfo.gameStatus = action.payload.gameStatus;
      state.gameInfo.gamePlayersData = action.payload.gamePlayersData;

      (state.roundInfo.wordFinishedRoundCount =
        action.payload.wordFinishedRoundCount),
        (state.roundInfo.wordTotalRoundCount =
          action.payload.wordTotalRoundCount),
        (state.roundInfo.playerFinishedRoundCount =
          action.payload.playerFinishedRoundCount),
        (state.roundInfo.gameRoundColor = action.payload.gameRoundColor),
        (state.roundInfo.gameRoundType = action.payload.gameRoundType),
        (state.roundInfo.gameRoundVariation =
          action.payload.gameRoundVariation),
        (state.roundInfo.gameRoundStatus = action.payload.gameRoundStatus),
        (state.roundInfo.nextRoundState = action.payload.nextRoundState);
    });
    builder.addCase(compareGameStateThunk.fulfilled, (state, action) => {
      state.compareDataWords = action.payload.words;
      state.compareGameAllRoundData = action.payload.compareGameAllRoundData;
    });
    builder.addCase(getLanguagesThunk.fulfilled, (state, action) => {
      state.supportedLanguages = action.payload.languages;
    });
    builder.addCase(advanceGameThunk.fulfilled, (state, action) => {
      state.roundInfo.gameRoundStatus = action.payload.gameRoundStatus;
    });

    builder.addMatcher(
      isAnyOf(
        getGameDetailsIntervalThunk.fulfilled,
        getGameDetailsThunk.fulfilled
      ),
      (state, action) => {
        state.gameInfo = action.payload;
      }
    );
  },
});

const { reducer } = adminSlice;
export const { cleanupGameInfo } = adminSlice.actions;
export default reducer;
