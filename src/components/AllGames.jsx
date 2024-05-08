import { useState, useEffect } from 'react';
import axios from 'axios';
import '../AllGames.css';

const AllGames = ({ selectedOption }) => {
    const apiKey= import.meta.env.VITE_API_KEY

    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [displayedGameIds, setDisplayedGameIds] = useState(new Set()); // New state variable
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]); // New state variable for the autocomplete suggestions



    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [displayedGameNames, setDisplayedGameNames] = useState(new Set());

useEffect(() => {
    const fetchGames = async () => {
        setIsLoading(true);

        let ordering;
        switch (selectedOption) {
            case 'dateAdded':
                ordering = 'added';
                break;
            case 'releaseDate':
                ordering = 'released';
                break;
            case 'name':
                ordering = 'name';
                break;
            case '':
                ordering = '';
        }

        try {
            const response = await axios.get(`https://api.rawg.io/api/games?page=${page}&page_size=20&ordering=${ordering}&key=${apiKey}`);

            let newGames = response.data.results;

            // Filter out games without a background image and games that have already been displayed
            newGames = newGames.filter(game => game.background_image && !displayedGameNames.has(game.name));

            // Add the names of the new games to the displayedGameNames set
            newGames.forEach(game => displayedGameNames.add(game.name));

            // Map over the games and add a new property, platformNames, which is an array of platform names
            newGames = newGames.map(game => ({
                ...game,
                platformNames: game.platforms.map(platform => platform.platform.name),
            }));

            setGames(prevGames => [...prevGames, ...newGames]);
        } catch (error) {
            console.error('Error fetching games:', error);
        }

        setIsLoading(false);
    };

    fetchGames();
}, [page, selectedOption, displayedGameNames]);



    const [prevSelectedOption, setPrevSelectedOption] = useState(selectedOption);

    useEffect(() => {
        if (prevSelectedOption !== selectedOption) {
            setPage(1);
            setGames([]);
            setDisplayedGameIds(new Set()); // Clear the displayedGameIds state
            setPrevSelectedOption(selectedOption);
        }
    }, [selectedOption, prevSelectedOption]);

    const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === '') {
        setSuggestions([]);
    } else {
        const newSuggestions = games.filter(game => game.name.toLowerCase().startsWith(value.toLowerCase()));
        setSuggestions(newSuggestions);
    }
};

    const handleSuggestionClick = (gameName) => {
        setSearchTerm(gameName);
        setSuggestions([]);
    };

    return (
        <div>
            <label>
               <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            </label>
            <div className='suggestions'>
    {suggestions.map((game) => (
        <div key={game.id} onClick={() => handleSuggestionClick(game.name)}>
            {game.name}
        </div>
    ))}
</div>
            {isLoading ? (
                <div className='loading'></div>
            ) : (
                <div className='wrap'>
                    {games.filter(game => game.name.toLowerCase().includes(searchTerm.toLowerCase())).map((game) => (
                        game.background_image && (
                            <div key={game.id} className='contenu'>
                                <div className='platforms'>
                                    {game.platformNames.slice(0,3).map(platformName => (
                                        <p key={platformName}>{platformName}</p>
                                    ))}
                                </div>
                                <img src={game.background_image} alt={game.name} className='images'/>
                                <p>{game.name}</p>

                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllGames;