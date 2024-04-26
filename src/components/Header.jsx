import { Link } from 'react-router-dom';

const Header = () => {
    return <div className="header">
      <div>
        <nav>
          <ul>
            <li>Home</li>
            <Link to="/games">Games</Link>
          </ul>
        </nav>
      </div>

      <div className="searchbar">
        <input type="text" placeholder= "Search..."/>
      </div>
    </div>;
  };

export default Header