import { useState, useLayoutEffect } from "react";
import data from "../public/data.js";
import styles from "../styles/Ants.module.css";

function Ants() {
  const [ants, setAnts] = useState([]);
  const [raceStatus, setRaceStatus] = useState("Not yet run.");

  // Loads the ant data into local state
  const loadAnts = async (data) => {
    const newArr = await data.map((ant) => ({
      ...ant,
      key: ant.name,
      probability: "tbd",
    }));
    await setAnts(newArr);
  };

  //Ant-win likilihood algorithm
  function generateAntWinLikelihoodCalculator() {
    const delay = 7000 + Math.random() * 7000;
    const likelihoodOfAntWinning = Math.random();

    return (callback) => {
      setTimeout(() => {
        callback(likelihoodOfAntWinning);
      }, delay);
    };
  }

  //To do: Get the callback function to update state.  UseEffectLayout with callback? Promises?
  const raceAnts = (ants) => {
    const newProbs = ants.map((ant) => ({
      ...ant,
      //Problem: Sets the state to function and not the returned value of the function.
      probability: generateAntWinLikelihoodCalculator(),
    }));
    setAnts(newProbs);
  };

  // When race is started running calculations on all ants simultaneously and render the DOM with results.
  useLayoutEffect(() => {
    if (raceStatus === "Not yet run.") {
      return;
    }
    //To do: Refactor raceAnts to update state.  Separate ants out into components and pass state into them.
    raceAnts(ants);
    console.log("Use effect triggered");
  }, [raceStatus]);

  //To do: Update race status
  //To do: Sort arrray

  return (
    <>
      <h1>🐜</h1>
      <button onClick={() => loadAnts(data)}>Load Ants</button>
      <button onClick={() => setRaceStatus("In progress 🏁")}>
        Start Race
      </button>
      <p>{`Race status = ${raceStatus}`}</p>
      <div className={styles.grid}>
        <div className={styles.gridHeader}>Ant name</div>
        <div className={styles.gridHeader}>Color</div>
        <div className={styles.gridHeader}>Length</div>
        <div className={styles.gridHeader}>Weight</div>
        <div className={styles.gridHeader}>Probability of winning</div>
        {ants.map((ant, i) => {
          return (
            <>
              <div key={ant.name}>{ant.name}</div>
              <div key={ant.color}>{ant.color}</div>
              <div key={ant.length}>{ant.length}</div>
              <div key={ant.weight}>{ant.weight}</div>
              <div key={ant.probability}>{ant.probability}</div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Ants;
