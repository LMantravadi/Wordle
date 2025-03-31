import { useWordleContext } from "../context/AppSlice";
import LetterTile from "./LetterTile";
import lineStyle from "./Line.module.css";
import { LETTER_COUNT_IN_WORD } from "../constants/constants";

export default function Line({ lineNumber }: { lineNumber: number }) {
  const { guessedWords } = useWordleContext();
  const currentWord = guessedWords.words[lineNumber].word;

  return (
    <div className={lineStyle.line}>
      {Array.from({ length: LETTER_COUNT_IN_WORD }, (_, index) => {
        return <LetterTile key={index} letterTile={currentWord[index]} />;
      })}
    </div>
  );
}
