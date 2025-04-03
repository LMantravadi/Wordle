
export const LETTER_COUNT_IN_WORD = 5;
export const NUMBER_OF_TRIALS = 6;

export enum LETTER_STATUS  {
     "INITIAL",     // Indicates the initial state of the letter
     "CORRECT",     // Indicates the letter is in the word in correct position
     "MISPLACED",   // Indicates the letter is in the word in incorrect position
     "WRONG",       // Indicates the letter is NOT in the word 
}

export enum GAME_STATUS  {
     "WRONG",            // Indicates current guessed word is wrong
     "IN_PROGRESS",      // Indicates the user is actively guessing
     "DUPLICATE",        // Indicates same word has been previously guessed
     "SUCCESS",          // Indicates user is successful in guessing the word
     "FAIL",             // Indicates user failed to guess eventually
     "INSUFFICIENT",     // Indicates insufficient letters in the word
     "EMPTY",            // Indicates the current word is empty
     "RESTART",          // Indicates game is restarted
}

export const TRIAL_ERROR_MESSAGES = [
     "Not quite there!",
     "Keep going!",
     "Almost!",
     "Good guess, but not this time.",
     "Try a different approach.",
     "You're close, but not quite there.",
     "Don't give up!",
     "Take another shot.",
];