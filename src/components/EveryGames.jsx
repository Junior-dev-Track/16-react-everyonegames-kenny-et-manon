import Buttons from "./Buttons"

const EveryGames = ({ setSelectedOption, selectedOption }) => {
    let title;
    switch (selectedOption) {
        case 'dateAdded':
            title = 'Games Sorted by Date Added';
            break;
        case 'releaseDate':
            title = 'Games Sorted by Release Date';
            break;
        case 'name':
            title = 'Games Sorted by Name';
            break;
        default:
            title = 'All Games';
    }

    return (
        <div className="every">
            <div className="haut">
                <h2>{title}</h2>
                <Buttons setSelectedOption={setSelectedOption}/>
            </div>
        </div>
    );
};

export default EveryGames;