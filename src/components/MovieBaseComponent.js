import { getFromLocalStorage } from '../Helpers/LocalStorage';

export const MovieBaseComponent = (data, getMovies, addToFav, props) => {
  let i = 0;
  let y = 0

  return (
    <div className="mx-3 p-3 box-border">
      {data?.titles &&
        data.titles.map((movie) => {
          return (
            <div
              key={i++}
              className="w-full p-4 text-center bg-red-50 shadow-2xl mx-4 my-3 border-2 rounded-lg"
            >
              <div className="grid grid-cols-1">
                <p>
                  <b>{movie.tconst}</b>
                </p>
                <b>{movie.originalTitle}</b>
                <button
                  className={`bg-blue-400 border-2 rounded-lg py-2 mt-2 mx-auto px-4 font-bold text-white w-1/4 ${props.isLoggedIn ? '' : 'hidden'}`}
                  name="Movie"
                  onClick={() => addToFav({variables: {email: getFromLocalStorage("filmShelfSessionKey")['email'], useCase: 'favorite_movies', result: movie.tconst, sessionKey: getFromLocalStorage("filmShelfSessionKey")['sessionKey']}})}
                >
                  Add to Fav!
                </button>
              </div>
              <div>
                <div>
                  {movie.genres.map((genre) => (
                    <ul className="list-disc list-inside text-center mx-auto" key={y++}>
                      <li className="my-8">
                        {genre}
                        <button
                          className={`bg-purple-400 border-2 rounded-lg py-2 mt-2 mx-4 px-4 font-bold text-white ${props.isLoggedIn ? '' : 'hidden'}`}
                          name="Genre"
                          onClick={() => addToFav({variables: {email: getFromLocalStorage("filmShelfSessionKey")['email'], useCase: 'followed_genres', result: genre, sessionKey: getFromLocalStorage("filmShelfSessionKey")['sessionKey']}})}

                        >
                          Follow Genre!
                        </button>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      <div className="text-center mt-6">
        <button
          className="bg-green-500 border-2 rounded-lg py-3 mt-2 mx-2 px-6 font-bold text-white"
          onClick={() => getMovies()}
        >
          Fetch!
        </button>
      </div>
    </div>
  );
};
