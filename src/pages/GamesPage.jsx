import Header from "../components/Header.jsx";
import EveryGames from "../components/EveryGames.jsx";
import AllGames from "../components/AllGames.jsx";
import { useState } from 'react';

const GamesPage = () => {
    const [selectedOption, setSelectedOption] = useState('');

    return <div>
    <Header />
    <EveryGames setSelectedOption={setSelectedOption}/>
    <AllGames setSelectedOption={setSelectedOption}/>
    </div>;
  }

  export default GamesPage
  