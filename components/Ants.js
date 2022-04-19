import { useState, useEffect } from "react";
import data from "../public/data.js";
import styles from "../styles/Ants.module.css";

function Ants() {
  const [ants, setAnts] = useState([]);
  const [raceStatus, setRaceStatus] = useState("Not yet run.");
  const [loadDisabled, setLoadDisabled] = useState(false);
  const [startDisabled, setStartDisabled] = useState(true);

  // Loads the ant data into local state
  const loadAnts = async (data) => {
    setRaceStatus("Not yet run");
    const newArr = await data.map((ant) => ({
      ...ant,
      key: ant.name,
      probability: "Not yet run",
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

  //Sets the likelihood of each ant winning and sorts by the winning ant.
  const setLikelihood = (ant, likelihood) => {
    //Find individual ant in the ants array and update it's probability of winning
    const findAnt = ants.find((i) => i.name === ant.name);
    findAnt.probability = (likelihood * 100).toFixed(0);
    //Find all other ants
    const remainingAnts = ants.filter((i) => i.name !== ant.name);
    //Rank ants by sorting their probability of winning
    const antRanks = [...remainingAnts, findAnt].sort((a, b) => {
      return b.probability - a.probability;
    });
    setAnts(antRanks);
  };

  //Loops over each ant and calculate likelihood of winning.
  const raceAnts = (ants) => {
    setRaceStatus("In progress");
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
      return ant.probability !== "Calculating...";
    });
    if (antsCalculated.length === ants.length && raceStatus === "In progress") {
      setRaceStatus("Complete");
      setLoadDisabled(false);
    }
  }, [ants]);

  return (
    <>
      <div className={styles.scoreContainer}>
        <p>{`Race status = ${raceStatus}`}</p>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => {
              loadAnts(data), setLoadDisabled(true), setStartDisabled(false);
            }}
            disabled={loadDisabled}
          >
            Load Ants
          </button>
          <button
            onClick={() => {
              raceAnts(ants), setStartDisabled(true);
            }}
            disabled={startDisabled}
          >
            Start Race
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Ant name</th>
            <th>Color</th>
            <th>Length</th>
            <th>Weight</th>
            <th>Probability of winning</th>
          </tr>
        </thead>
        {ants.map((ant) => {
          return (
            <tr key={ant.name}>
              <td key={ant.name}>{ant.name}</td>
              <td key={ant.color}>
                <div
                  className={styles.antColor}
                  style={{ background: ant.color }}
                />
              </td>
              <td key={ant.length}>{ant.length}</td>
              <td key={ant.weight}>{ant.weight}</td>
              <td key={ant.probability}>{ant.probability}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
}

export default Ants;
