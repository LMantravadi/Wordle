
export const LETTER_COUNT_IN_WORD = 5;
export const NUMBER_OF_TRIALS = 6;
export const targetWord = "POINT";

export enum LETTER_STATUS  {
     "CORRECT", /// Indicates the letter is in the word in correct position
     "MISPLACED", /// Indicates the letter is in the word in incorrect position
     "WRONG", /// Indicates the letter is NOT in the word 
}

export enum GAME_STATUS  {
     "SUCCESS", /// Indicates user is successful in guessing the word
     "FAIL", /// Indicates user failed to guess eventually
     "INSUFFICIENT", /// Indicates insufficient letters in the word
}

