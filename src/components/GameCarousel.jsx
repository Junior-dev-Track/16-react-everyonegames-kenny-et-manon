import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../App.css';
import '../GameCarousel.css';
import axios from 'axios';

const GameCarousel = () => {
    const [games, setGames] = useState([]);
    const [centeredGameIndex, setCenteredGameIndex] = useState(0); // New state variable

    useEffect(() => {
        const fetchGames = async () => {
            const response = await axios.get(`https://api.rawg.io/api/games?ordering=-metacritic&page=1&key=${import.meta.env.VITE_API_KEY}`);
            const allGames = response.data.results;

            // Map over the games and add a new property, platformNames, which is an array of platform names
            const topRatedGames = allGames.slice(0, 9).map(game => ({
                ...game,
                platformNames: game.platforms.map(platform => platform.platform.name),
            }));

            setGames(topRatedGames);
        };

        fetchGames();
    }, []);

    return (
        <div className="carousel-container">
            <Carousel
                key={games.length} // Add this line
                showThumbs={false}
                showIndicators={false}
                showArrows={true}
                centerMode
                centerSlidePercentage={33.33}
                infiniteLoop
                dynamicHeight
                // autoPlay
                transitionTime={500}
                onChange={setCenteredGameIndex} // Update centeredGameIndex when the centered slide changes
            >

                {games.filter(game => game.name.toLowerCase() !== 'soulcalibur (1998)').map((game) => (
                    <div className="games-container" key={game.id}>
                        <img className="game-image" src={game.background_image} alt={game.name} />
                        <div className="game-content-wrapper">
                            <div className="game-content">
                                <div className="game-content-header">
                                    {game.platformNames.map(platformName => (
                                        <p key={platformName}>{platformName}</p>
                                    ))}
                                </div>
                                <div className="game-content-footer">
                                    <p className="game-content-name">{game.name}</p>
                                    <p className="game-content-desc">{game.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>

        </div>
    );

};

export default GameCarousel;