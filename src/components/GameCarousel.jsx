import { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../App.css';
import '../GameCarousel.css'

const GameCarousel = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
    const fetchGames = async () => {
        const response = await axios.get(`https://api.rawg.io/api/games?ordering=-metacritic&page=1&key=39f531e8bfe4449383ae0f9bb9fdfb42`);
        const allGames = response.data.results;

        // Limit the number of games to 8
        const topRatedGames = allGames.slice(0, 8);

        setGames(topRatedGames);
    };

    fetchGames();
}, []);

    return (
        <div className="carousel-container" style={{ display: 'flex', justifyContent: 'center' }}>
            <Carousel
                showThumbs={false}
                showIndicators={false}
                showArrows={true}
                centerMode
                centerSlidePercentage={33.33}
                infiniteLoop
                dynamicHeight
                // autoPlay
                transitionTime={500}
            >
                {games.map((game, index) => (
                    <div className="games-container" key={game.id}>
                        <img className="game-image" src={game.background_image} alt={game.name} />
                        <p className="legend">{game.name}</p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default GameCarousel;