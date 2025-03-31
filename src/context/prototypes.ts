import { LETTER_STATUS } from "../constants/constants";

export interface LetterProps {
  letter: string; status: LETTER_STATUS.CORRECT | LETTER_STATUS.MISPLACED | LETTER_STATUS.WRONG
}

export interface WordProps {
    word: LetterProps[];
  }

export interface GuessedWordsProps {
  words: WordProps[];
  currentWordIndex: number;
}
  
export interface wordGridProps {
    letterCount: number;
    numberOfTrials: number;
    guessedWords: GuessedWordsProps;
  }
  
export interface KeyboardProps {
  onLetterSelect: (letter: string) => void;
}
  