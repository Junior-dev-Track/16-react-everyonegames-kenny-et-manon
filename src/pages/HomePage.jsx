import Header from "../components/Header.jsx";
import TrendingGames from "../components/TrendingGames.jsx";
import GameCarousel from '../components/GameCarousel.jsx'



const HomePage = () => {
  return <div>
    <Header />
    <TrendingGames />
    <GameCarousel />
  </div>;
}

export default HomePage;