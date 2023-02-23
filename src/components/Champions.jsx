import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Champions.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
function Champions() {
  const [champions, setChampions] = useState([]);
  const [selectedChampion, setSelectedChampion] = useState(null);
  const [championFilter, setChampionFilter] = useState("");

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
    console.log(champion);
  };

  const handleClosePopup = () => {
    setSelectedChampion(null);
  };
  
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("popup")) {
      setSelectedChampion(null);
    }
  };
  const handleChampionFilterChange = (event) => {
    setChampionFilter(event.target.value);
  };

  const filteredChampions = champions.filter((champion) =>
    champion.name.toLowerCase().includes(championFilter.toLowerCase())
  );

  return (
    <div>
      
      <h1>Lista championów:</h1>
      <div className="filter-container">
      <input
        type="text"
        placeholder="Wyszukaj championa..."
        value={championFilter}
        onChange={handleChampionFilterChange}
      />
      <hr></hr>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Obrazek</th>
            <th>Nazwa</th>
          </tr>
        </thead>
        <tbody>
          {filteredChampions.map((champion, index) => (
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
  <div className="popup" onClick={handleOverlayClick} >
    <div className="popup-content">
      <img src={selectedChampion.image} alt={selectedChampion.name} />
      <div className="champion-info">
        <h2>{selectedChampion.name}</h2>
        <table>
          <thead>
            <tr>
              <th>Level </th>
              <th>Health </th>
              <th>Damage </th>
              <th>Armor </th>
              <th>Magic Resist </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(18)].map((_, index) => {
              const level = index + 1;
              const stats = selectedChampion.stats;
              return (
                <tr key={level}>
                  <td>{level}</td>
                  <td>{Math.round(stats.hp + stats.hpperlevel * level)}</td>
                  <td>{Math.round(stats.attackdamage + stats.attackdamageperlevel * level)}</td>
                  <td>{Math.round(stats.armor + stats.armorperlevel * level)}</td>
                  <td>{Math.round(stats.spellblock + stats.spellblockperlevel * level)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h2>Statystyki względem poziomu:</h2>
        <LineChart
          width={500}
          height={300}
          data={[...Array(18)].map((_, index) => {
            const level = index + 1;
            const stats = selectedChampion.stats;
            return {
              level,
              health: Math.round(stats.hp + stats.hpperlevel * level),
              damage: Math.round(stats.attackdamage + stats.attackdamageperlevel * level),
              armor: Math.round(stats.armor + stats.armorperlevel * level),
              magicResist: Math.round(stats.spellblock + stats.spellblockperlevel * level),
            };
          })}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="level" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="health" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="damage" stroke="#82ca9d" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="armor" stroke="#ffc658" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="magicResist" stroke="#ff7300" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
      <button onClick={handleClosePopup}>Close</button>
    </div>
  </div>
)}

    </div>
  );
}

export default Champions;