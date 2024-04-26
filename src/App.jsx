import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AllGames from './components/AllGames';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/games" element={<AllGames />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;