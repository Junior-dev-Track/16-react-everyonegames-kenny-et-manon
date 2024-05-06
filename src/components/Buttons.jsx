import { useState, useEffect } from "react";
import axios from "axios";



const Buttons = () => {

// logique pour les boutons

const [dateAdded, setDateAdded] = useState([]);

const [name, setName] = useState([]);

const [releaseDate, setReleaseDate] = useState([]);

const [xbox, setXbox] = useState([]);

const [playstation, setPlaystation] = useState([]);

const [pc, setPc] = useState([]);

useEffect(() => {
  const fetchGames = async () => {
      const response = await axios.get(`https://api.rawg.io/api/games?ordering=-&page=1&key=39f531e8bfe4449383ae0f9bb9fdfb42`);
      const allGames = response.data.results;
      setDateAdded(allGames);
  };

  fetchGames();
}, []);




    return (
      <div className="Buttons">
        <div>
          <p>Filter by</p>
          <select className="filterSelect">
            <option value="dateAdded" onClick={dateAdded}>Date added</option>
            <option value="name">Name</option>
            <option value="releaseDate">Release date</option>
          </select>
      </div>

      <div>
        <p>Platform</p>
        <select className="platformSelect">
          <option value="xbox">Xbox</option>
          <option value="playstation">Playstation</option>
          <option value="pc">PC</option>
          </select>
      </div>
    </div>
  )};

    

export default Buttons