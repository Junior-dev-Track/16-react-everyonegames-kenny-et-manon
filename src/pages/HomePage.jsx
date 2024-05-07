// HomePage.jsx
import { useState } from 'react';
import Header from "../components/Header.jsx";
import TrendingGames from "../components/TrendingGames.jsx";
import GameCarousel from '../components/GameCarousel.jsx';
import AllGames from '../components/AllGames.jsx';

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState('trending');

  return (
    <div>
      <Header setSelectedOption={setSelectedOption} />
      <TrendingGames setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
      {selectedOption === 'trending' && <GameCarousel />}
      {selectedOption !== 'trending' && <AllGames selectedOption={selectedOption} />}
    </div>
  );
}

export default HomePage;