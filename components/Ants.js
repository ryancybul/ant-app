import { useState, useEffect } from "react";
import data from "../public/data.js";
import styles from "../styles/Ants.module.css";

function Ants() {
  const [ants, setAnts] = useState([]);
  const [raceStatus, setRaceStatus] = useState("Not yet run.");

  // Loads the ant data into local state
  const loadAnts = async (data) => {
    setRaceStatus("Not yet run.");
    const newArr = await data.map((ant) => ({
      ...ant,
      key: ant.name,
      probability: "Not yet run",
    }));
    await setAnts(newArr);
  };

  //Ant-win likilihood algorithm
  //To do switch time back to 7000 after raceAnts is functional
  function generateAntWinLikelihoodCalculator() {
    const delay = 1000 + Math.random() * 1000;
    const likelihoodOfAntWinning = Math.random();
    return (callback) => {
      setTimeout(() => {
        callback(likelihoodOfAntWinning);
      }, delay);
    };
  }

  //Sets the likelihood of each ant winning and sorts by the winning ant.
  const setLikelihood = (ant, likelihood) => {
    //Find individual ant in the ants array and update it's probability of winning
    const findAnt = ants.find((i) => i.name === ant.name);
    findAnt.probability = likelihood.toFixed(2) * 100;
    //Find all other ants
    const remainingAnts = ants.filter((i) => i.name !== ant.name);
    //Rank ants by sorting their probability of winning
    const rankAnts = [...remainingAnts, findAnt].sort((a, b) => {
      return b.probability - a.probability;
    });
    setAnts(rankAnts);
  };

  //Loops over each ant and calculate likelihood of winning.
  const raceAnts = (ants) => {
    setRaceStatus("In progress 🏁");
    ants.map((ant) => {
      const getLikelihood = generateAntWinLikelihoodCalculator();
      ant.probability = "Calculating...";
      getLikelihood((likelihood) => {
        setLikelihood(ant, likelihood);
      });
    });
  };

  //Update race status to all calculated when all likelihoods have been calculated
  useEffect(() => {
    const antsCalculated = ants.filter((ant) => {
      return ant.probability !== "Not yet run";
    });
    if (antsCalculated.length === ants.length) {
      setRaceStatus("Complete");
    }
  }, [ants]);

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
