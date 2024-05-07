// Buttons.jsx
const Buttons = ({ setSelectedOption }) => {

  const handleChange = (event) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div className="Buttons">
      <div>
        <p>Filter by</p>
        <select className="filterSelect" onChange={handleChange}>
          <option value="name">Name</option>
          <option value="dateAdded">Date added</option>
          <option value="releaseDate">Release date</option>

        </select>
      </div>

      <div>
        <p>Platform</p>
        <select className="platformSelect">
          <option value="xbox">Xbox</option>
          <option value="playstation">Playstation</option>
          <option value="pc">PC</option>
        </select>
      </div>
    </div>
  );
};

export default Buttons