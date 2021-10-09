import React, { useState } from "react";
import Movies from "./containers/Movies";
import SearchBar from "./containers/SearchBar";
import Names from './containers/Names';
import LoginBar from './containers/LoginBar';

function App() {
  const [searchMovieResult, setSearchMovieResult] = useState('');
  const [searchNameResult, setSearchNameResult] = useState('');
  const [loginEmailResult, setLoginEmailResult] = useState('');
  const [loginPasswordResult, setLoginPasswordResult] = useState('');

  const handleChange = (e, name) => {
    if (name === "movie") setSearchMovieResult(e.target.value)
    else if (name=== 'name') setSearchNameResult(e.target.value)
    else if (name === 'email') setLoginEmailResult(e.target.value)
    else if (name === 'password') setLoginPasswordResult(e.target.value)
  };

  return (
    <div className="App">
      <h1 className="text-center font-serif font-extrabold text-3xl pt-4">Welcome to Film Shelf</h1>
      <div className="mt-14 py-4 shadow-2xl bg-green-50 mx-4 border-2 rounded-lg w-1/2 mx-auto">
        <LoginBar placeholder={['email', 'password']} result={[loginEmailResult, loginPasswordResult]} loginChange={handleChange} name={['email', 'password']}/>
      </div>
      <div className="grid grid-cols-2 mt-14 py-6 shadow-2xl bg-blue-50 mx-auto border-2 rounded-lg w-4/5">
        <SearchBar
          placeholder="Search for movies"
          result={searchMovieResult}
          searchChange={(e) => handleChange(e, "movie")}
          name="movie"
        />
        <SearchBar
          placeholder="Search for names"
          result={searchNameResult}
          searchChange={(e) => handleChange(e, "name")}
          name="name"
        />
      </div>
      <div className="grid grid-cols-2 shadow-l py-4 my-4 mx-4 border-2 rounded-lg">
        <Movies result={searchMovieResult}/>
        <Names result={searchNameResult}/>
      </div>
    </div>
  );
}

export default App;
