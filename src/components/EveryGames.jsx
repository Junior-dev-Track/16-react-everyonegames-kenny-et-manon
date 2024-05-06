import Buttons from "./Buttons"

const EveryGames = ({ setSelectedOption }) => {
    return (<div className="every">
      <div className="haut">
      <h2>All Games</h2>
      <Buttons setSelectedOption={setSelectedOption}/>
      </div>
        
    </div>);
  };

export default EveryGames;