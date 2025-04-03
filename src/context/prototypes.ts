import { LETTER_STATUS } from "../constants/wordle-constants";

export interface LetterProps {
  letter: string; status: LETTER_STATUS;
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
  