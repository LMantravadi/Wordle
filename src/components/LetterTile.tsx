import { ReactNode } from "react";
import styles from "./LetterTile.module.css";
import { LetterProps } from "../context/prototypes";
import { LETTER_STATUS } from "../constants/wordle-constants";

interface LetterTileProps {
  letterTile: LetterProps;
  onLetterSelect?: (letter: string) => void;
}
export default function LetterTile({
  letterTile,
  onLetterSelect,
}: LetterTileProps) {
  let style = "";
  let width = 40;

  if (
    letterTile?.letter.toLowerCase() === "enter" ||
    letterTile?.letter.toLowerCase() === "backspace"
  ) {
    style += styles.actionButton;
    width = 100;
  } else
    style +=
      letterTile?.status === LETTER_STATUS.CORRECT
        ? styles.correct
        : letterTile?.status === LETTER_STATUS.WRONG
        ? styles.wrong
        : letterTile?.status === LETTER_STATUS.MISPLACED
        ? styles.misplaced
        : styles.initial;

  const handleUserInputOnEnter = (
    e: React.KeyboardEvent<HTMLParagraphElement>
  ) => {
    console.log(e.target);
  };
  const getLetterTiles = (): ReactNode => {
    return (
      <p
        style={{
          border: "solid black 1px",
          borderRadius: "1rem",
          height: 40,
          width: width,
          padding: 5,
          marginBottom: 2,
          marginTop: 5,
          marginRight: 5,
          fontWeight: "bold",
        }}
        className={style}
        onClick={() => onLetterSelect?.(letterTile.letter)}
        onKeyDown={(e: React.KeyboardEvent<HTMLParagraphElement>) =>
          handleUserInputOnEnter(e)
        }
      >
        {letterTile?.letter}
      </p>
    );
  };

  return getLetterTiles();
}
