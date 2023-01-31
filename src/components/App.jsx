import React,{useState} from 'react';
import '../css/App.css'
import axios from 'axios'

function App() {
const [searchText, setSearchtext] = useState("");
const [PlayerData, setPlayerData] = useState({});
const [selectedRegion, setSelectedRegion] = useState('eun1');
const [showPlayerData, setShowPlayerData] = useState(false);
const [error, setError] = useState(false);
const API_KEY = '';

function searchForPlayer(event){
console.log("Szukam: " + searchText);
const APICallString = "https://"+selectedRegion+".api.riotgames.com/tft/summoner/v1/summoners/by-name/"+ searchText + "?api_key=" + API_KEY;

axios.get(APICallString).then(function(response){
//success
console.log(response.data);
setPlayerData(response.data);
setShowPlayerData(true);
setError(false);

}).catch(function(error){
//error
console.log(error);
setError(true);
});
}

console.log(PlayerData);

return (
<div className="app">
<div className='title'>
<h5>Double Up Search player</h5>
</div>
<div className="container">
<input type="text" onChange={e => setSearchtext(e.target.value)} className="form-control" placeholder="Type summoner name to Search" />
<select onChange={e => setSelectedRegion(e.target.value)} className="form-control">
<option value="eun1">EUNE</option>
<option value="euw1">EUW</option>
<option value="na1">NA</option>
</select>
<button onClick={e => searchForPlayer(e) }class="btn">Search</button>
</div>
{Object.keys(PlayerData).length !== 0 && !error ? 
<>
  <p>Found player data: </p>
  <p>Nick: {PlayerData.name} </p>
  <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/10.16.1/img/profileicon/" + PlayerData.profileIconId + ".png"} alt="Profile Icon" />
  <p>Level: {PlayerData.summonerLevel} </p>
  <p>Account ID: {PlayerData.accountId} </p>
  <p>Summoner ID: {PlayerData.id} </p>
  <p>PUUID: {PlayerData.puuid} </p>
  

</> 

: error ? 
  <><p>No player data/API KEY not filled</p></>
: 
null
}
</div>
)
}

export default App