import { useState, useEffect } from 'react';
import axios from 'axios';
import '../AllGames.css';

const AllGames = ({ selectedOption }) => {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [displayedGameIds, setDisplayedGameIds] = useState(new Set()); // New state variable

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
            const response = await axios.get(`https://api.rawg.io/api/games?page=${page}&page_size=20&ordering=${ordering}&key=8c5e4c7f795649dfaf47cb2454e4bf18`);

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




    return (
        <div>
            {isLoading ? (
                <div className='loading'></div>
            ) : (
                <div className='wrap'>
                    {games.map((game) => (
                        game.background_image && (
                            <div key={game.id} className='contenu'>
                                <img src={game.background_image} alt={game.name} className='images'/>
                                <p>{game.name}</p>

                                <div className='platforms'>
                                    {game.platformNames.map(platformName => (
                                        <p key={platformName}>{platformName}</p>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllGames;