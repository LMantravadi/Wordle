import { LETTER_STATUS } from "../constants/constants";
import { useWordleContext } from "../context/AppSlice";
import { LetterProps } from "../context/prototypes";
import LetterTile from "./LetterTile";
import styles from "./Keyboard.module.css";
import cssStyles from "./Line.module.css";

export default function Keyboard() {
  const { handleLetterSelect } = useWordleContext();
  const keyboardRows = ["QWERTYUIOP", "ASDFGHJKL", "↵ZXCVBNM⌫"];

  const getLetterTiles = () => {
    // console.log("Keyboard Loading...");
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
                status: LETTER_STATUS.WRONG,
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
