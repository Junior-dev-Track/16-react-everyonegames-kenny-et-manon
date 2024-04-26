import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./Header.jsx";

const AllGames = () => {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);

    const fetchPlatforms = async () => {
        const response = await axios.get('https://api.rawg.io/api/platforms');
        return response.data.results;
    };

    useEffect(() => {
        const fetchGames = async () => {
            const response = await axios.get(`https://api.rawg.io/api/games?&key=39f531e8bfe4449383ae0f9bb9fdfb42`);
            const fetchedGames = response.data.results;

            const platforms = await fetchPlatforms();

            const gamesWithPlatforms = fetchedGames.map(game => {
                const gamePlatforms = platforms.filter(platform => game.platforms.includes(platform.id));
                return { ...game, platforms: gamePlatforms };
            });

            setGames(prevGames => [...prevGames, ...gamesWithPlatforms]);
        };

        fetchGames();
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
            setPage(prevPage => prevPage + 1);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <Header />
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {games.map((game) => (
                    <div key={game.id} style={{ flexBasis: '16.66%', margin: '10px' }}>
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