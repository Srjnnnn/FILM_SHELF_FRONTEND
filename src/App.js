import React, { useState } from "react";
import Movies from "./components/Movies";
import SearchBar from "./components/SearchBar";
import Names from './components/Names';

function App() {
  const [searchMovieResult, setSearchMovieResult] = useState('');
  const [searchNameResult, setSearchNameResult] = useState('');

  const handleChange = (e, name) => {
    if (name === "movie") setSearchMovieResult(e.target.value);
    else setSearchNameResult(e.target.value);
  };

  return (
    <div className="App">
      <div className="grid grid-cols-2">
        <SearchBar
          placeholder="Search for movies"
          result={searchMovieResult}
          searchChange={(e) => handleChange(e, "movie")}
          name="movie"
        />
        <SearchBar
          placeholder="Search for names"
          result={searchNameResult}
          searchChange={(e) => handleChange(e, "title")}
          name="title"
        />
      </div>
      <div className="grid grid-cols-2">
        <Movies result={searchMovieResult}/>
        <Names result={searchNameResult}/>
      </div>
    </div>
  );
}

export default App;
