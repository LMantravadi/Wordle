import { LETTER_STATUS } from "../constants/wordle-constants";
import { useWordleContext } from "../context/AppSlice";
import { LetterProps } from "../context/prototypes";
import LetterTile from "./LetterTile";
import styles from "./Keyboard.module.css";
import cssStyles from "./Line.module.css";

export default function Keyboard() {
  const { handleLetterSelect, guessedWords } = useWordleContext();
  const keyboardRows = ["QWERTYUIOP", "ASDFGHJKL", "↵ZXCVBNM⌫"];

  const getKeyboardLetterStatus = (keyboardLetter: string) => {
    let status: LETTER_STATUS = LETTER_STATUS.INITIAL;
    const words = guessedWords.words.slice(0, guessedWords.currentWordIndex);

    for (const { word } of words) {
      for (const { letter, status: letterStatus } of word) {
        if (letter.toLowerCase() === keyboardLetter.toLowerCase()) {
          if (letterStatus === LETTER_STATUS.CORRECT) {
            return LETTER_STATUS.CORRECT; // Highest priority → return immediately
          }
          if (letterStatus === LETTER_STATUS.MISPLACED) {
            status = LETTER_STATUS.MISPLACED; // Only update if not already Correct
          }
          if (
            letterStatus === LETTER_STATUS.WRONG &&
            status !== LETTER_STATUS.MISPLACED
          ) {
            status = LETTER_STATUS.WRONG; // Only update if no better status found
          }
        }
      }
    }
    return status;
  };

  const getLetterTiles = () => {
    return (
      <div
        style={{ margin: 10, border: "solid 1px black", padding: 10 }}
        className={styles.keyboard}
      >
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className={cssStyles.line}>
            {row.split("").map((letter) => {
              const keyboardLetter: LetterProps = {
                letter:
                  letter === "↵"
                    ? "Enter"
                    : letter === "⌫"
                    ? "Backspace"
                    : letter,
                status: getKeyboardLetterStatus(letter),
              };
              return (
                <LetterTile
                  key={letter}
                  letterTile={keyboardLetter}
                  onLetterSelect={handleLetterSelect}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  };
  return getLetterTiles();
}
