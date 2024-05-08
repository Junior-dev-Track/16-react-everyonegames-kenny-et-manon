// Header.jsx
import { Link } from 'react-router-dom';

const Header = ({ setSelectedOption }) => {
  const handleHomeClick = () => {
    setSelectedOption('trending');
  };

  const handleGamesClick = () => {
    setSelectedOption('All');
  };

  return (
      <div className="header">
        <div>
          <nav>
            <ul>
              <Link className='links' to="/" onClick={handleHomeClick}>Home</Link>
              <Link className='links' to="/" onClick={handleGamesClick}>Games</Link>
            </ul>
          </nav>
        </div>

        {/*<div className="searchbar">*/}
        {/*  <label>*/}
        {/*    /!*<input type="text" placeholder= "Search..."/>*!/*/}
        {/*  </label>*/}
        {/*</div>*/}
      </div>
  );
};

export default Header;