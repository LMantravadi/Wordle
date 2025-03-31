import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { GuessedWordsProps, LetterProps } from "./prototypes";
import {
  NUMBER_OF_TRIALS,
  LETTER_COUNT_IN_WORD,
  LETTER_STATUS,
  GAME_STATUS,
} from "../constants/constants";

interface WordleContextType {
  setTargetWord: Dispatch<SetStateAction<string>>;
  guessedWords: GuessedWordsProps;
  setGuessedWords: Dispatch<SetStateAction<GuessedWordsProps>>;
  restartGame: () => void;
  handleLetterSelect: (letter: string) => void;
  gameStatus: GAME_STATUS | undefined;
}
// 1. Create a Context, set to initial state

const WordleContext = createContext<WordleContextType | undefined>(undefined);

// 2. Create a Provider component
const WordleContextProvider = ({ children }: { children: ReactNode }) => {
  const initialState: GuessedWordsProps = {
    words: Array.from({ length: NUMBER_OF_TRIALS }, () => ({ word: [] })),
    currentWordIndex: 0,
  };

  // the word user has to guess
  const [targetWord, setTargetWord] = useState("");
  // holds user guessed words

  const [guessedWords, setGuessedWords] =
    useState<GuessedWordsProps>(initialState);

  // indicates if game is over and user not successful
  const [gameStatus, setGameStatus] = useState<GAME_STATUS | undefined>(
    undefined
  );

  function handleLetterSelect(letter: string) {
    if (letter.toLowerCase() === "backspace") {
      eraseLetter();
    } else if (letter.toLowerCase() === "enter") {
      //user done with guessing the word
      handleWordSelect();
    } else {
      //add currently entered letter to the current word
      addLetter(letter);
    }
  }

  function addLetter(letter: string) {
    setGuessedWords((prevList) => {
      const updatedWords = prevList.words.map((wordEntries) => ({
        word: wordEntries.word.map((tile) => ({ ...tile })),
      }));

      const currentWordIndex = prevList.currentWordIndex;

      //if user entered all the letters,
      // prevent from adding more letters
      if (updatedWords[currentWordIndex].word.length === LETTER_COUNT_IN_WORD) {
        return prevList;
      }

      updatedWords[currentWordIndex].word.push({
        letter,
        status: LETTER_STATUS.WRONG,
      });

      return {
        ...prevList,
        words: updatedWords,
      };
    });
  }

  function eraseLetter() {
    setGuessedWords((prevWords: GuessedWordsProps) => {
      const updatedWords = prevWords.words.map((wordEntries) => ({
        word: wordEntries.word.map((tile) => ({ ...tile })),
      }));

      updatedWords[guessedWords.currentWordIndex].word.pop();

      return {
        ...prevWords,
        words: updatedWords,
      };
    });
  }

  function handleWordSelect() {
    const currentWord = guessedWords.words[guessedWords.currentWordIndex].word;
    if (currentWord.length < LETTER_COUNT_IN_WORD) {
      setGameStatus(GAME_STATUS.INSUFFICIENT);
      return;
    }

    checkForCorrectEntry();
  }

  function checkForCorrectEntry() {
    // get the current word and mark each letter's status
    const updatedWordList = [...guessedWords.words];
    const currentWordIndex = guessedWords.currentWordIndex;
    const currentWord = [...updatedWordList[currentWordIndex].word];

    let userWord = "";

    currentWord.forEach((tile: LetterProps, index) => {
      userWord += tile.letter;
      if (tile.letter.toLowerCase() === targetWord[index])
        tile.status = LETTER_STATUS.CORRECT;
      else if (targetWord.includes(tile.letter.toLowerCase())) {
        tile.status = LETTER_STATUS.MISPLACED;
      } else tile.status = LETTER_STATUS.WRONG;
    });

    updatedWordList[currentWordIndex] = { word: currentWord };

    console.log(userWord, targetWord);
    if (userWord.toLowerCase() === targetWord) {
      setGameStatus(GAME_STATUS.SUCCESS);
    } else if (currentWordIndex === NUMBER_OF_TRIALS - 1) {
      setGameStatus(GAME_STATUS.FAIL);
    } else {
      setGuessedWords((prev: GuessedWordsProps) => ({
        words: updatedWordList,
        currentWordIndex:
          prev.currentWordIndex < LETTER_COUNT_IN_WORD
            ? prev.currentWordIndex + 1 // Advance to the next line if the current trial fails.
            : prev.currentWordIndex, // the last trial
      }));
    }
  }

  function restartGame() {
    setGuessedWords(initialState);
    setGameStatus(undefined);
  }

  return (
    <WordleContext.Provider
      value={{
        setTargetWord,
        guessedWords,
        setGuessedWords,
        handleLetterSelect,
        restartGame,
        gameStatus,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};

export default WordleContextProvider;

// 3. Create a custom hook to consume the context
export const useWordleContext = () => {
  const context = useContext(WordleContext);
  if (!context) throw new Error("use wordle context");

  return context;
};
