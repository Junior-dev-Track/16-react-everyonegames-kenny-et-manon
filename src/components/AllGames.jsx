import { useState, useEffect } from 'react';
import axios from 'axios';
import '../AllGames.css';

const AllGames = ({ selectedOption }) => {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);

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
            let fetchedGames = [];
            let currentPage = 1;

            // Fetch games page by page until you have enough Latin games
            while (fetchedGames.length < 100) {
                const response = await axios.get(`https://api.rawg.io/api/games?page=${currentPage}&page_size=50&ordering=${ordering}&key=39f531e8bfe4449383ae0f9bb9fdfb42`);

                let newGames = response.data.results;

                // Filter out games whose names are not written in the Latin alphabet
                newGames = newGames.filter(game => isLatinText(game.name));

                // Filter out games without a background image
                newGames = newGames.filter(game => game.background_image);

                fetchedGames = [...fetchedGames, ...newGames];

                currentPage++;
            }

            // Slice the array to get the desired number of games
            fetchedGames = fetchedGames.slice(0, 100);

            // Sort the games based on their names only if selectedOption is 'name'
            if (selectedOption === 'name') {
                fetchedGames.sort((a, b) => a.name.localeCompare(b.name));
            }

            setGames(fetchedGames);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    fetchGames();
}, [selectedOption]);


    return (
    <div>
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
    </div>
)};

export default AllGames;