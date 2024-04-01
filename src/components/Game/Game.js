import React, { useState } from "react";

import { sample, range } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.

function Game() {
  const [guessList, setGuessList] = useState([]);

  return (
    <>
      <GuessOutput guessList={guessList} />
      <Guess setGuessList={setGuessList} />
    </>
  );
}

function GuessOutput({ guessList }) {
  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((num) => (
        <GuessCell key={num} value={guessList[num]} />
      ))}
    </div>
  );
}

function GuessCell({ value }) {
  return (
    <p className="guess">
      {range(5).map((num) => (
        <span className="cell" key={num}>
          {value ? value[num] : undefined}
        </span>
      ))}
    </p>
  );
}

function Guess({ setGuessList }) {
  const [guess, setGuess] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    setGuessList((items) => [...items, guess]);
    setGuess("");
  }

  return (
    <>
      <form className="guess-input-wrapper" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="guess-input">Enter guess:</label>
        <input
          required
          minLength={5}
          maxLength={5}
          id="guess-input"
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value.toUpperCase())}
        />
      </form>
    </>
  );
}

export default Game;
