import { useState } from "react";
import "./App.css";
import Keyboard from "./components/Keyboard";
import WordleGrid from "./components/WordleGrid";

const letterCountInWord = 5;
const numberOfTrials = 6;
const WORD = "POINT";

export interface WordProps {
  word: { letter: string; isCorrect: boolean }[];
}
export interface GuessedWordsProps {
  words: WordProps[];
  currentWordIndex: number;
}

function App() {
  const [guessedWords, setguessedWords] = useState<GuessedWordsProps>({
    words: Array.from({ length: numberOfTrials }, () => ({ word: [] })),
    currentWordIndex: 0,
  }); // holds all the words guessed so far
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false); // holds the word the user is currently guessing

  // useEffect(() => {
  //   const fetchRandomWord = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/", {
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         method: "POST",
  //         body: JSON.stringify({ guess: "words" }),
  //       });

  //       const data = await response.json();
  //       console.log(data.word);
  //       setCurrentWord(data.word);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchRandomWord();
  // }, []);

  function handleLetterSelect(letter: string) {
    console.log(`selected ${letter}`);

    if (letter === "backspace") {
      eraseLetter();
    } else if (letter === "enter") {
      //user done with current trial
      handleWordSelect();
    } else {
      //add currently entered letter to the current word
      addLetter(letter);
    }
  }

  // function addLetter(letter: string) {
  //   setguessedWords((prevList) => {
  //     const updatedWords = [...prevList.words];

  //     // Prevent adding more than allowed number of letters
  //     if (
  //       updatedWords[prevList.currentWordIndex].word.length ===
  //       letterCountInWord
  //     ) {
  //       return prevList;
  //     }

  //     // Get the current word and append the new letter
  //     const currentWord = [
  //       ...updatedWords[prevList.currentWordIndex].word,
  //       {
  //         letter,
  //         isCorrect:
  //           letter ===
  //           WORD[updatedWords[prevList.currentWordIndex].word.length],
  //       },
  //     ];

  //     // Update the current word in the list
  //     updatedWords[prevList.currentWordIndex] = { word: currentWord };

  //     return {
  //       ...prevList,
  //       words: updatedWords,
  //     };
  //   });
  // }

  function addLetter(letter: string) {
    setguessedWords((prevList) => {
      const updatedWordList = [...prevList.words];

      // All letters for current trial have been entered.
      // prevent from adding more letters than allowed number of letters
      if (
        updatedWordList[prevList.currentWordIndex].word.length ===
        letterCountInWord
      )
        return prevList;

      // Get the current word and add the new letter

      console.log("Adding letter: ");
      let currentWord = [
        ...updatedWordList[prevList.currentWordIndex].word,
        {
          letter,
          isCorrect:
            letter ===
            WORD[updatedWordList[prevList.currentWordIndex].word.length],
        },
      ];

      // if (prevList.words.length > 0) {
      //   currentWord = [
      //     ...prevList.words[prevList.currentWordIndex].word,
      //     { letter, isCorrect: isCorrectLetter },
      //   ];
      // } else {
      //   currentWord.push({ letter, isCorrect: isCorrectLetter });
      // }

      console.log(currentWord);
      updatedWordList[prevList.currentWordIndex].word = currentWord;
      console.log(`updatedWordList: ${updatedWordList}`);
      return {
        ...prevList,
        words: updatedWordList,
      };
    });
  }

  function eraseLetter() {
    const updatedWordsList = [...guessedWords.words];
    const currentWord = [
      ...guessedWords.words[guessedWords.currentWordIndex].word,
    ];
    currentWord.pop();

    updatedWordsList[guessedWords.currentWordIndex].word = currentWord;
    setguessedWords((prevWords) => {
      return {
        ...prevWords,
        words: updatedWordsList,
      };
    });
  }

  function handleWordSelect() {
    console.log(
      `entered word: ${guessedWords.words[guessedWords.currentWordIndex]}`
    );

    if (
      guessedWords.words[guessedWords.currentWordIndex].word.length <
      letterCountInWord
    ) {
      alert("Not enough letters");
      return;
    }
    setguessedWords((prev) => ({
      words: [...prev.words],
      currentWordIndex: prev.currentWordIndex + 1,
    }));

    checkForCorrectEntry();
  }

  function checkForCorrectEntry() {
    if (
      guessedWords.words[guessedWords.currentWordIndex].word.join("") === WORD
    ) {
      setIsSuccessful(true);
      alert("Success");
    }
  }
  return (
    <>
      <h1>Wordle Game</h1>
      <WordleGrid
        letterCount={letterCountInWord}
        numberOfTrials={numberOfTrials}
        guessedWords={guessedWords}
      />
      <Keyboard onLetterSelect={handleLetterSelect} />
    </>
  );
}

export default App;
