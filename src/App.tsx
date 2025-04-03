import "./App.css";
import Keyboard from "./components/Keyboard";
import WordleGrid from "./components/WordleGrid";
import {
  GAME_STATUS,
  TRIAL_ERROR_MESSAGES,
} from "./constants/wordle-constants";
import { useWordleContext } from "./context/AppSlice";
import { useEffect } from "react";

function App() {
  const { restartGame, gameStatus, targetWord, setTargetWord } =
    useWordleContext();

  useEffect(() => {
    const fetchRandomWord = async () => {
      interface WordObject {
        word: string;
        score: number;
      }
      try {
        const response = await fetch("https://api.datamuse.com/words?sp=?????");

        const data = await response.json();
        const words = data.map((wordObj: WordObject) => wordObj.word);

        const randomNumber = Math.floor(Math.random() * 100);

        setTargetWord(words[randomNumber]);
      } catch (err) {
        console.log(err);
      }
    };

    // fetch a new word only on initial load or when game is restarted
    if (gameStatus === GAME_STATUS.RESTART || gameStatus === undefined) {
      fetchRandomWord();
    }
  }, [gameStatus]);

  function getStatusMessage(status: string) {
    let statusMessage;

    switch (status) {
      case "trial":
        statusMessage = (
          <h2>
            {
              TRIAL_ERROR_MESSAGES[
                Math.floor(Math.random() * TRIAL_ERROR_MESSAGES.length)
              ]
            }
          </h2>
        );
        break;
      case "success":
        statusMessage = <h2>Success !!</h2>;
        break;
      case "fail":
        statusMessage = (
          <>
            <h2>Sorry !!</h2>
            <p>
              The correct word is <strong>{targetWord.toUpperCase()}</strong>.
              Better luck next time.
            </p>
          </>
        );
        break;
      case "insufficient":
        statusMessage = <h2>Insufficient Letters.</h2>;
        break;
      case "empty":
        statusMessage = <h2>Please enter a word.</h2>;
        break;
      case "duplicate":
        statusMessage = <h2>Word already guessed.</h2>;
        break;
    }

    return statusMessage;
  }
  return (
    <>
      <header>
        <h1>Wordle Game</h1>
        <button onClick={restartGame}>Restart</button>
      </header>
      {gameStatus !== GAME_STATUS.RESTART &&
        gameStatus !== undefined &&
        gameStatus !== GAME_STATUS.IN_PROGRESS && (
          <div className="message">
            {gameStatus === GAME_STATUS.SUCCESS && getStatusMessage("success")}
            {gameStatus === GAME_STATUS.FAIL && getStatusMessage("fail")}
            {gameStatus === GAME_STATUS.INSUFFICIENT &&
              getStatusMessage("insufficient")}
            {gameStatus === GAME_STATUS.EMPTY && getStatusMessage("empty")}
            {gameStatus === GAME_STATUS.DUPLICATE &&
              getStatusMessage("duplicate")}
            {gameStatus === GAME_STATUS.WRONG && getStatusMessage("trial")}
          </div>
        )}

      <WordleGrid />
      <Keyboard />
    </>
  );
}

export default App;
