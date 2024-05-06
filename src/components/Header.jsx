import { Link } from 'react-router-dom';


// logique pour la recherche

const Header = () => {
    return <div className="header">
      <div>
        <nav>
          <ul>
            <Link className='links' to="/">Home</Link>
            <Link className='links' to="/games">Games</Link>
          </ul>
        </nav>
      </div>

      <div className="searchbar">
        <input type="text" placeholder= "Search..."/>
      </div>
    </div>;
  };

export default Header