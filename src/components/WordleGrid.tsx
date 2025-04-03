import { ReactNode } from "react";
import Line from "./Line";
import { NUMBER_OF_TRIALS } from "../constants/wordle-constants";

export default function WordleGrid() {
  const getWordLines = (): ReactNode => {
    return NUMBER_OF_TRIALS
      ? Array.from({ length: NUMBER_OF_TRIALS }, (_, lineIndex) => {
          return <Line key={lineIndex} lineNumber={lineIndex} />;
        })
      : null;
  };

  return getWordLines();
}
