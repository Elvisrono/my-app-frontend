import React , { useEffect , useState} from "react";

function Search({searchFunction}) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    searchFunction(search)
  },
  [search])

  // update state on input change 
  function handleSearch(e){
    e.preventDefault();
    setSearch(e.target.value);
  }
  return (
    <form className="d-flex">
    <input className="formcontrol"
    type="text" placeholder="Search tasks" onChange={handleSearch}
    id="search"/>
    <button className="btn btn-outline-info ms-1"
        id= "searchBtn">SEARCH</button>
        
</form>
  
  );
}

export default Search;
