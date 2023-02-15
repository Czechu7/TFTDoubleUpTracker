import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Champions.css"
function App() {
  const [champions, setChampions] = useState([]);
  const [selectedChampion, setSelectedChampion] = useState(null);

  useEffect(() => {
    axios
      .get("http://ddragon.leagueoflegends.com/cdn/13.3.1/data/en_US/champion.json")
      .then((response) => {
        const championData = response.data.data;
        const championArray = Object.values(championData).map((champion) => ({
          name: champion.name,
          image: `http://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${champion.image.full}`,
          stats: champion.stats,
          info: champion.info
        }));
        setChampions(championArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChampionClick = (champion) => {
    setSelectedChampion(champion);
  };

  const handleClosePopup = () => {
    setSelectedChampion(null);
  };

  return (
    <div>
      <h1>Lista championów:</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Obrazek</th>
            <th>Nazwa</th>
          </tr>
        </thead>
        <tbody>
          {champions.map((champion, index) => (
            <tr key={index} onClick={() => handleChampionClick(champion)}>
              <td>{index + 1}</td>
              <td>
                <img src={champion.image} alt={champion.name} />
              </td>
              <td>{champion.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedChampion && (
        <div className="popup">
          <div className="popup-content">
          <img src={selectedChampion.image} alt={selectedChampion.name} />
            <h2>{selectedChampion.name}</h2>
            <div>
              <p>Obrażenia: {selectedChampion.info.attack}</p>
              <p>Zdrowie: {selectedChampion.stats.hp}</p>
              <p>Statystyki bazowe:</p>
              <ul>
                <li>Atak: {selectedChampion.stats.attackdamage}</li>
                <li>Obrona: {selectedChampion.stats.armor}</li>
                <li>Magia: {selectedChampion.stats.spellblock}</li>
              </ul>
            </div>
            <button onClick={handleClosePopup}>Zamknij</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;