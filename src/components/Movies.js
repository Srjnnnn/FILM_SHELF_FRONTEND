import React from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_MOVIES } from '../constants/Constants';

function Movies(props) {
  const [getMovies, { loading, error, data }] = useLazyQuery(
    GET_MOVIES,
    {
      variables: { originalTitle: props.result },
    }
  );

  if (loading)
    return (
      <div>
        <p>Loading ...</p>
        
      </div>
    );
  if (error) return `Error! ${error}`;
  return (
    <div>
      {data?.titles &&
        data.titles.map((movie) => {
          return (
            <div
              key={movie._id}
              className="w-full p-4 text-center bg-red-50 shadow-2xl m-4 border-2 rounded-lg"
            >
            <div><b>{movie.originalTitle}</b></div>
            <div><div>{movie.genres.map(genre => <div><button>{genre}</button></div>)}</div></div>
            </div>
          );
        })}
        <div className="text-center mt-6">
        <button className="bg-green-500 border-2 rounded-lg py-3 mt-2 mx-2 px-6 font-bold text-white" onClick={() => getMovies()}>Fetch!</button>
        </div>
    </div>
  );
}

export default Movies;
