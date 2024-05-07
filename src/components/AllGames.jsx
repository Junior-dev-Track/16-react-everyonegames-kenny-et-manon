import { useState, useEffect } from 'react';
import axios from 'axios';
import '../AllGames.css';

const AllGames = ({ selectedOption }) => {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false); // New state variable

    const isLatinText = (text) => {
        const latinCharRegex = /^[A-Za-z].*$/;
        return latinCharRegex.test(text);
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
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
                default:
                    ordering = 'name';
            }

            try {
                const response = await axios.get(`https://api.rawg.io/api/games?page=${page}&page_size=20&ordering=${ordering}&key=39f531e8bfe4449383ae0f9bb9fdfb42`);

                let newGames = response.data.results;

                // Filter out games whose names are not written in the Latin alphabet
                newGames = newGames.filter(game => isLatinText(game.name));

                // Filter out games without a background image
                newGames = newGames.filter(game => game.background_image);

                // Create a Set to store the keys of the games that have already been seen
                const seenKeys = new Set(games.map(game => game.key));

                // Filter out games with the same key
                newGames = newGames.filter(game => !seenKeys.has(game.key));

                // Add the new games to the existing games
                setGames(prevGames => [...prevGames, ...newGames]);
            } catch (error) {
                console.error('Error fetching games:', error);
            }

            setIsLoading(false); // Set isLoading to false after fetching data
        };

        fetchGames();
    }, [page, selectedOption]);

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div> // Render a loading circle here
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