// HomePage.jsx
import { useState } from 'react';
import Header from "../components/Header.jsx";
import TrendingGames from "../components/TrendingGames.jsx";
import GameCarousel from '../components/GameCarousel.jsx';
import AllGames from '../components/AllGames.jsx';

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [homeClicked, setHomeClicked] = useState(false);

  const handleHomeClick = () => {
    setHomeClicked(!homeClicked);
  };

  return (
    <div>
      <Header handleHomeClick={handleHomeClick} />
      <TrendingGames setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
      {!selectedOption && <GameCarousel />}
      {selectedOption && <AllGames selectedOption={selectedOption} />}
      {homeClicked && <div>Home content</div>}
    </div>
  );
}

export default HomePage;