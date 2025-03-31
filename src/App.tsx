import "./App.css";
import Keyboard from "./components/Keyboard";
import WordleGrid from "./components/WordleGrid";
import { GAME_STATUS, targetWord } from "./constants/constants";
import { useWordleContext } from "./context/AppSlice";
import { useEffect } from "react";

function App() {
  const { restartGame, gameStatus, setTargetWord } = useWordleContext();
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
        console.log(words[randomNumber]);
        setTargetWord(words[randomNumber]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRandomWord();
  }, [gameStatus]);

  return (
    <>
      <header>
        <h1>Wordle Game</h1>
        <button onClick={restartGame}>Restart</button>
      </header>
      {gameStatus != undefined && (
        <div className="message">
          {gameStatus === GAME_STATUS.SUCCESS && <h2>Success !!</h2>}
          {gameStatus === GAME_STATUS.FAIL && (
            <>
              <h2>Sorry !!</h2>
              <p>
                The correct word is <strong>{targetWord}. </strong>Better luck
                next time.
              </p>
            </>
          )}
          {gameStatus === GAME_STATUS.INSUFFICIENT && (
            <p>Insufficient Letters</p>
          )}
        </div>
      )}

      <WordleGrid />
      <Keyboard />
    </>
  );
}

export default App;
