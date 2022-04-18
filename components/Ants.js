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
  //To do switch time back to 7000 after raceAnts is functional
  function generateAntWinLikelihoodCalculator() {
    const delay = 1 + Math.random() * 1;
    const likelihoodOfAntWinning = Math.random();

    return (callback) => {
      setTimeout(() => {
        callback(likelihoodOfAntWinning);
      }, delay);
    };
  }
  const getsData = generateAntWinLikelihoodCalculator;

  //To do: Get the callback function to update state.
  const raceAnts = async (ants) => {
    setRaceStatus("In progress 🏁");

    const newArr = await Promise.all(
      ants.map(async (ant) => ({
        ...ant,
        probability: await getsData()((likelihood) => {
          likelihood;
        }),
      }))
    );

    await setAnts(newArr);
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
