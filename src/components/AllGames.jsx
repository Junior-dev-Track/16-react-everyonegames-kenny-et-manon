import { useState, useEffect } from 'react';
import axios from 'axios';
import '../AllGames.css';

const AllGames = () => {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);



    const fetchGamesByAddedDate = async () => {
        const response = await axios.get(https://api.rawg.io/api/games?ordering=-added&page=1&key=39f531e8bfe4449383ae0f9bb9fdfb42);
        const fetchedGames = response.data.results;

        const platforms = await fetchPlatforms();

        const gamesWithPlatforms = fetchedGames.map(game => {
            const gamePlatforms = platforms.filter(platform => game.platforms.includes(platform.id));
            return { ...game, platforms: gamePlatforms };
        });

        setGames(gamesWithPlatforms);
    };


    useEffect(() => {
    const fetchGames = async () => {
        const response = await axios.get(`https://api.rawg.io/api/games?page=${page}&page_size=20&key=39f531e8bfe4449383ae0f9bb9fdfb42`);
        const fetchedGames = response.data.results;

        const gamesWithPlatforms = fetchedGames.map(game => {
            return { ...game };
        });

        setGames(prevGames => {
            const newGames = gamesWithPlatforms.filter(game => !prevGames.some(prevGame => prevGame.id === game.id));
            return [...prevGames, ...newGames]
        });
    };

    fetchGames();
}, [page]);

useEffect(() => {
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 500) return;
        setPage(prevPage => prevPage + 1);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, []);

return (
    <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {games.map((game) => (
                <div key={game.id} style={{ flexBasis: '20%', margin: '10px', border: '1px solid #ddd', borderRadius: '5px', padding: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)' }}>
                    <img src={game.background_image} alt={game.name} style={{ width: '100%', height: 'auto' }} />
                    <p>{game.name}</p>
                    {game.platforms.map(platform => (
                        <p key={platform.id}>{platform.name}</p>
                    ))}
                </div>
            ))}
        </div>
    </div>
);
};

export default AllGames;