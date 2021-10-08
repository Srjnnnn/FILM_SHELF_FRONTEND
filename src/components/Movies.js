import React from "react";
import { gql, useLazyQuery } from "@apollo/client";

const GET_MOVIES = gql`
  query titles($originalTitle: String!) {
    titles(originalTitle: $originalTitle) {
      originalTitle
      _id
      tconst
      primaryTitle
      titleType
      isAdult
      startYear
      endYear
      runtimeMinutes
      genres
    }
  }
`;

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
              className="w-full p-4 text-center inline"
            >
            <div><b>{movie.originalTitle}</b></div>
            <div><div>{movie.genres.map(genre => <div><button>{genre}</button></div>)}</div></div>
            </div>
          );
        })}
        <button onClick={() => getMovies()}>Refetch!</button>
    </div>
  );
}

export default Movies;
