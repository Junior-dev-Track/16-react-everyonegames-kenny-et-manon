// Header.jsx
import { Link } from 'react-router-dom';

const Header = ({ setSelectedOption }) => {
    const handleHomeClick = () => {
        setSelectedOption('');
    };

    return (
        <div className="header">
            <div>
                <nav>
                    <ul>
                        <Link className='links' to="/" onClick={handleHomeClick}>Home</Link>
                        <Link className='links' to="/" onClick={() => setSelectedOption('all')}>Games</Link>
                    </ul>
                </nav>
            </div>

            <div className="searchbar">
                <input type="text" placeholder= "Search..."/>
            </div>
        </div>
    );
};

export default Header;