import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import BrandrButton from 'components/brandrButton/brandrButton';
import BrandrInput from 'components/brandrInput/brandrInput';
import {
  createWordThunk,
  getAllWordsThunk,
  getLanguagesThunk,
} from 'redux/actions/adminActions';
import { CreateWordTranslations } from 'redux/models/adminModels';
import { showModal } from 'redux/reducers/modalReducer';
import { RootState } from 'redux/store';
import {
  ModalTypeEnum,
  SupportedLanguageEnum,
  WordColorEnum,
} from 'utils/enums';
import { BrandrSvgEnum } from 'utils/imageIconEnum';
import { StringResources } from 'utils/language/languageResource';
import { TranslationWord } from 'utils/models';
import { ConfirmDeleteWordModalProps } from 'containers/brandrModalContainer/confirmDeleteWordModal/confirmDeleteWordModal';
import './adminWords.scss';

function AdminWords() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [newWords, setNewWords] = useState([] as Array<CreateWordTranslations>);
  const allWords = useSelector(
    (state: RootState) => state.admin.translationWords
  );
  const languages = useSelector(
    (state: RootState) => state.admin.supportedLanguages
  );

  useEffect(() => {
    dispatch(getAllWordsThunk());
    dispatch(getLanguagesThunk());
  }, []);

  const openRemoveWordModal = (valueToDelete: TranslationWord) => {
    return () => {
      dispatch(
        showModal<ConfirmDeleteWordModalProps>(
          ModalTypeEnum.ConfirmDeleteWordModal,
          { data: valueToDelete }
        )
      );
    };
  };

  const addWord = async () => {
    dispatch(
      createWordThunk({
        translations: newWords,
      })
    );
    setNewWords([]);
  };

  const onWordTextChange = (languageId: number) => {
    return (event: any) => {
      const updatedWords = [...newWords];
      const indexOfWord = updatedWords.findIndex(
        (x) => x.supportedLanguageId == languageId
      );
      if (indexOfWord < 0) {
        updatedWords.push({
          supportedLanguageId: languageId,
          text: event.target.value,
        });
      } else {
        updatedWords[indexOfWord].text = event.target.value;
      }
      setNewWords(updatedWords);
    };
  };

  const isCreateDisabled =
    newWords.length < languages.length || newWords.some((x) => x.text == '');

  return (
    <>
      <div className='admin-words'>
        <div className='admin-words-new'>
          {languages.map((x, index) => {
            const value =
              newWords.find((y) => y.supportedLanguageId == x.id)?.text ?? '';
            return (
              <BrandrInput
                key={x.id}
                onTextChange={onWordTextChange(x.id)}
                type='text'
                header={x.name}
                value={value}
                placeholder={t(StringResources.AddNewWord, {
                  lng: SupportedLanguageEnum[x.id as SupportedLanguageEnum],
                })}
              />
            );
          })}
          <BrandrButton
            color='green'
            svg={BrandrSvgEnum.Arrowright}
            text={'Add new word'}
            onClick={addWord}
            disabled={isCreateDisabled}
            size='normal'
          />
        </div>
        <div className='admin-words-table'>
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                {languages.map((x) => {
                  return <th>{x.name}</th>;
                })}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allWords.map((word, index) => {
                const className = `admin-words-table-row-${
                  WordColorEnum[word.wordColor]
                }`;
                return (
                  <tr className={className}>
                    <td>{word.wordId}</td>
                    {languages.map((x) => {
                      const translatedWord =
                        word.translations.find(
                          (y) => y.supportedLanguageId == x.id
                        )?.text ?? 'Word not translated';
                      return <td>{translatedWord}</td>;
                    })}
                    <td className='admin-words-table-action'>
                      <div
                        className='admin-words-table-action-link'
                        onClick={openRemoveWordModal(word)}
                      >
                        Delete word
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default AdminWords;
