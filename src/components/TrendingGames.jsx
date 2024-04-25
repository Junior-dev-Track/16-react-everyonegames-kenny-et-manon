<<<<<<< Updated upstream
import Buttons from "./Buttons";

const TrendingGames = () => {
    return <div className="trending">

      <div className="haut">
      <h2>Trending Games</h2>
      <Buttons />
      </div>
        
    </div>;
  };

import GameCarousel from './GameCarousel';

const TrendingGames = () => {
    return (
        <div>
            <GameCarousel />
        </div>
    );
};

export default TrendingGames;