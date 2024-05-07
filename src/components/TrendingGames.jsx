// TrendingGames.jsx
import Buttons from "./Buttons"

const TrendingGames = ({ setSelectedOption, selectedOption }) => {
    return (
      <div className="trending">
        <div className="haut">
          <h2>{selectedOption === 'trending' ? 'Trending Games' : 'All Games'}</h2>
          <Buttons setSelectedOption={setSelectedOption} />
        </div>
      </div>
    );
};

export default TrendingGames;