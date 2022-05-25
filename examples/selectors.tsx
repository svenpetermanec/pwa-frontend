import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { AnswerTypeEnum, GameRoundVariationEnum } from 'utils/enums';

export const gameWordsByAnswerTypeSelector = createSelector(
  [
    (state: RootState) => state.admin.gameInfo.words,
    (state, answerType: AnswerTypeEnum) => answerType,
  ],
  (items, answerType) => {
    if (answerType == AnswerTypeEnum.DoesNotApply) {
      return items.filter((x) => x.wordCompleted == false);
    }
    return items.filter(
      (x) => x.answerType == answerType && x.wordCompleted == true
    );
  }
);

export const compareGameWordsByAnswerTypeSelector = createSelector(
  [
    (state: RootState) => state.admin.compareDataWords,
    (state, answerType: AnswerTypeEnum) => answerType,
    (state, answerType: AnswerTypeEnum, isFuture: boolean) => isFuture,
  ],
  (items, answerType, isFuture) => {
    return items.filter(
      (x) =>
        x.answerType == answerType &&
        (isFuture
          ? x.gameRoundVariation == GameRoundVariationEnum.Future
          : x.gameRoundVariation == GameRoundVariationEnum.Present)
    );
  }
);
