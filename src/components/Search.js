import React, { useEffect, useState } from "react";

function Search({ searchFunction, loggedIn}) {
  const [search, setSearch] = useState("");
  
  // update state on input change 
  function handleSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:9293/users/${loggedIn.id}/tasks`);
        const data = await response.json();
        const filteredData = data.filter((item) => item.description.includes(search));
        searchFunction(filteredData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [search, searchFunction]);

  return (
    <form className="d-flex">
      <input className="formcontrol"
        type="text"
        placeholder="Search tasks"
        onChange={handleSearch}
        id="search"
      />
      <button className="btn btn-outline-info ms-1" id="searchBtn">SEARCH</button>
    </form>
  );
}

export default Search;
