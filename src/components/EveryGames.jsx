// EveryGames.jsx
import { useEffect, useState } from 'react';

const EveryGames = ({ setSelectedOption, selectedOption }) => {
    const [options, setOptions] = useState([
        { value: 'all', label: 'All' },
        { value: 'dateAdded', label: 'Date Added' },
        { value: 'releaseDate', label: 'Release Date' },
        { value: 'name', label: 'Name' },
    ]);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => {
        if (selectedOption === 'all') {
            // Display AllGames component
        }
    }, [selectedOption]);

    return (
        <div>
            <select onChange={handleSelectChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default EveryGames;