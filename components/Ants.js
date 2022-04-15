import data from "../public/data.js";
import { useState } from "react";
import styles from "../styles/Ants.module.css";

function Ants() {
  const [ants, setAnts] = useState([]);
  const [raceStatus, setRaceStatus] = useState("Not yet run 🏁");

  //ant-win likilihood algorithm
  function generateAntWinLikelihoodCalculator() {
    const delay = 7000 + Math.random() * 7000;
    const likelihoodOfAntWinning = Math.random();

    return (callback) => {
      setTimeout(() => {
        callback(likelihoodOfAntWinning);
      }, delay);
    };
  }

  // Loads the ant data into local state
  const loadAnts = async (data) => {
    const newArr = await data.map((ant) => ({
      ...ant,
      key: ant.name,
      probability: "tbd",
    }));
    await setAnts(newArr);
  };

  //When data has been fetched, User must be able to Start a Race, which triggers running calculations on all ants simultaneously.
  const raceAnts = (ants) => {
    const newProbs = ants.map((ant) => ({
      ...ant,
      probability: "🌭",
    }));
    setAnts(newProbs);
  };

  return (
    <>
      <h1>🐜</h1>
      <button onClick={() => loadAnts(data)}>Load Ants</button>
      <button onClick={() => raceAnts(ants)}>Start Race</button>
      <p>{`Race status = ${raceStatus}`}</p>
      <div className={styles.grid}>
        <div className={styles.gridHeader}>Ant name</div>
        <div className={styles.gridHeader}>Color</div>
        <div className={styles.gridHeader}>Length</div>
        <div className={styles.gridHeader}>Weight</div>
        <div className={styles.gridHeader}>Probability of winning</div>
        {ants.map((ant) => {
          return (
            <>
              <div key={ant.key}>{ant.name}</div>
              <div key={ant.key}>{ant.color}</div>
              <div key={ant.key}>{ant.length}</div>
              <div key={ant.key}>{ant.weight}</div>
              <div key={ant.key}>{ant.probability}</div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Ants;
