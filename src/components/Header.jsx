const Header = () => {
    return <div className="header">
      <div>
        <nav>
          <ul>
            <li>Home</li>
            <li>Games</li>
          </ul>
        </nav>
      </div>

      <div className="searchbar">
        <input type="text" placeholder= "Search..."/>
      </div>
    </div>;
  };

export default Header