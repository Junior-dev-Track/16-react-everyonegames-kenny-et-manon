import { useState, useEffect } from 'react';
import axios from 'axios';
import '../AllGames.css';

const AllGames = ({ selectedOption }) => {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchGames = async () => {
            let ordering;
            switch (selectedOption) {
                case 'dateAdded':
                    ordering = '-added';
                    break;
                case 'releaseDate':
                    ordering = '-released';
                    break;
                case 'name':
                    ordering = '-name';
                    break;
            }

            const response = await axios.get(`https://api.rawg.io/api/games?page=${page}&page_size=20&ordering=${ordering}&key=39f531e8bfe4449383ae0f9bb9fdfb42`);
            // console.log(response.data.results);
            const fetchedGames = response.data.results;

            setGames(fetchedGames); // Set games directly to fetchedGames
        };

        fetchGames();
    }, [page, selectedOption]); // Add selectedOption to the dependency array

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 500) return;
    //         setPage(prevPage => prevPage + 1);
    //     };
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {games.map((game) => (
                    <div key={game.id} style={{ flexBasis: '20%', margin: '10px', border: '1px solid #ddd', borderRadius: '5px', padding: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)' }}>
                        <img src={game.background_image} alt={game.name} style={{ width: '100%', height: 'auto' }} />
                        <p>{game.name}</p>
                        {/*{game.platforms.map(platform => (*/}
                        {/*    <p key={platform.platform.id}>{platform.platform.name}</p>*/}
                        {/*))}*/}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllGames;