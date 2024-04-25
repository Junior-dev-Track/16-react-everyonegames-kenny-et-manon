const Buttons = () => {
    return (
      <div className="Buttons">
        <div>
          <p>Filter by</p>
          <select className="filterSelect">
            <option value="dateAdded">Date added</option>
            <option value="name">Name</option>
            <option value="releaseDate">Release date</option>
          </select>
      </div>

      <div>
        <p>Filter by</p>
        <select className="platformSelect">
          <option value="all">All platforms</option>
          </select>
      </div>
    </div>
  )};

    

export default Buttons