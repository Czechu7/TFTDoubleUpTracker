import React,{useState} from 'react';
import '../css/App.css'
import axios from 'axios'

function MainSearch() {
const [searchText, setSearchtext] = useState("");
const [PlayerData, setPlayerData] = useState({});
const [selectedRegion, setSelectedRegion] = useState('eun1');
const [showPlayerData, setShowPlayerData] = useState(false);
const [noAPIKey, setNoAPIKey] = useState(false);
const [noPlayerData, setNoPlayerData] = useState(false);
const [matchData, setMatchData] = useState([]);
const [matchGetMatchInfo, setGetMatchInfo] = useState([]);
const [matchGetMatchMetaData, setGetMatchMetaData] = useState([]);
const API_KEY = '';


async function getMatchData() {
  const APICallString = `https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/${PlayerData.puuid}/ids?count=20&api_key=${API_KEY}`;

  try {
    const response = await axios.get(APICallString);
    setMatchData(response.data);
  } catch (error) {
    console.log(error);
  }
}

async function GetMatchInfo() {
  
  const APICallString = `https://europe.api.riotgames.com/tft/match/v1/matches/${matchData[0]}?api_key=${API_KEY}`;

  try {
    const response = await axios.get(APICallString);
    console.log(response.data);
    setGetMatchInfo(response.data);
 
  } catch (error) {
    console.log(error);
  }
}
async function GetMatchMetaData() {
  
  const APICallString = `https://europe.api.riotgames.com/tft/match/v1/matches/${matchData[0]}?api_key=${API_KEY}`;

  try {
    const response = await axios.get(APICallString);
    console.log(response.data);
    setGetMatchMetaData(response.data);
 
  } catch (error) {
    console.log(error);
  }
}



function searchForPlayer(event){
console.log("Szukam: " + searchText);
const APICallString = "https://"+selectedRegion+".api.riotgames.com/tft/summoner/v1/summoners/by-name/"+ searchText + "?api_key=" + API_KEY;

if (!API_KEY) {
setNoAPIKey(true);
return;
}

axios.get(APICallString).then(function(response){
//success
console.log(response.data);
setPlayerData(response.data);
setShowPlayerData(true);
setNoAPIKey(false);
setNoPlayerData(false);

}).catch(function(error){
//error
console.log(error);
setNoPlayerData(true);
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
{Object.keys(PlayerData).length !== 0 && !noPlayerData ? 
<>
  <p>Found player data: </p>
  <p>Nick: {PlayerData.name} </p>
  <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/10.16.1/img/profileicon/" + PlayerData.profileIconId + ".png"} alt="Profile Icon" />
  <p>Level: {PlayerData.summonerLevel} </p>
  <p>Account ID: {PlayerData.accountId} </p>
  <p>Summoner ID: {PlayerData.id} </p>
  <p>PUUID: {PlayerData.puuid} </p>
  <button onClick={getMatchData}>Get Match Data</button>
        {matchData.length > 0 ? 
          <ul>
            {matchData.map(matchId => (
              <li key={matchId}>{matchId}</li>
            ))}
          </ul>
          : null
            }
  <button onClick={GetMatchInfo}>Get metadata match information</button>
  {Object.keys(matchGetMatchInfo).length !== 0 && (
        <div>
          <p>Metadata:</p>
          <p>{JSON.stringify(matchGetMatchInfo.info)}</p>
        </div>
      )}
       <button onClick={GetMatchMetaData}>Get info match metadata</button>
  {Object.keys(matchGetMatchMetaData).length !== 0 && (
        <div>
          <p>Metadata:</p>
          <p>{JSON.stringify(matchGetMatchMetaData.metadata)}</p>
        </div>
      )}
  
</>

: noAPIKey ?
<><p>API KEY not filled</p></>
: noPlayerData ?
<><p>No player data</p></>
: 
null
}
</div>
)
}

export default MainSearch;