import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [champions, setChampions] = useState([]);

  useEffect(() => {
    axios
      .get("http://ddragon.leagueoflegends.com/cdn/13.3.1/data/en_US/champion.json")
      .then((response) => {
        const championData = response.data.data;
        const championArray = Object.values(championData).map((champion) => ({
          name: champion.name,
          image: `http://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${champion.image.full}`
        }));
        setChampions(championArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img src={champion.image} alt={champion.name} />
              </td>
              <td>{champion.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
