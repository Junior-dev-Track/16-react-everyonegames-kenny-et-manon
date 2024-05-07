import { useState, useEffect } from 'react';
import axios from 'axios';
import '../AllGames.css';

const AllGames = ({ selectedOption }) => {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false); // New state variable

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
    const displayedGameIds = new Set(); // Create a new Set to store the ids of displayed games

    const fetchGames = async () => {
        setIsLoading(true); // Set isLoading to true before fetching data

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
            newGames = newGames.filter(game => game.background_image && !displayedGameIds.has(game.id));

            // Add the ids of the new games to the Set
            newGames.forEach(game => displayedGameIds.add(game.id));

            // Append the new games to the existing games
            setGames(prevGames => [...prevGames, ...newGames]);
        } catch (error) {
            console.error('Error fetching games:', error);
        }

        setIsLoading(false); // Set isLoading to false after fetching data
    };

    fetchGames();
}, [page, selectedOption]);

 useEffect(() => {
    setPage(1);
    setGames([]); // Clear the games state
}, [selectedOption]);

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div> // Render a loading message here
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {games.map((game) => (
                        game.background_image && (
                            <div key={game.id} style={{ flexBasis: '20%', margin: '10px', border: '1px solid #ddd', borderRadius: '5px', padding: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)' }}>
                                <img src={game.background_image} alt={game.name} style={{ width: '100%', height: 'auto' }} />
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