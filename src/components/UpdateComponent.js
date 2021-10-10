import { Link } from "react-router-dom";

export const UpdateComponent = (
  userData,
  SearchBar,
  handleChange,
  newPasswordResult,
  updateUser,
  MovieData
) => {
  let i = 0;

  return (
    <div className="text-center mt-10">
      <h1 className="text-center font-serif font-extrabold text-3xl pt-4 bg-green-100 shadow-2xl w-min mx-auto text-red-400 border-2 rounded-lg p-10 custom">
        {userData.user.email}
      </h1>
      <h2 className="text-center font-serif font-extrabold text-2xl pt-4 custom mb-10">
        User selections
      </h2>
      <div className="flex justify-center bg-pink-50 shadow-2xl border border-4 rounded-3xl w-min mx-auto pb-8 pt-2 px-8">
        <div className="mx-6">
          <h3 className="text-center font-serif font-extrabold text-xl pt-4 custom mb-3 w-max">
            Favorite Movies
          </h3>
          {MovieData.title.map((movie) => {
            return (
              <div key={i++}>
                <p className="w-max">
                  <b>{movie.originalTitle}</b>
                </p>
              </div>
            );
          })}
        </div>
        <div className="mx-6">
          <h3 className="text-center font-serif font-extrabold text-xl pt-4 custom mb-3 w-max">
            Favorite Movies
          </h3>
          {userData.user.favoriteActors.map((actor) => {
            return (
              <div key={i++}>
                <p>
                  <b>{actor}</b>
                </p>
              </div>
            );
          })}
        </div>
        <div className="mx-6">
          <h3 className="text-center font-serif font-extrabold text-xl pt-4 custom mb-3 w-max">
            Followed Genres
          </h3>
          {userData.user.followedGenres.map((genre) => {
            return (
              <div key={i++}>
                <p>
                  <b>{genre}</b>
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-10">
        <SearchBar
          name={"newPassword"}
          placeholder={"new Password"}
          searchChange={(e) => handleChange(e, "newPassword")}
          result={newPasswordResult}
          type="password"
        />
      </div>
      <button
        className="bg-blue-500 border-2 rounded-lg py-3 mt-2 mx-2 px-6 font-bold text-white"
        onClick={() => updateUser()}
      >
        Update Password
      </button>

      <Link to="/">
        <button className="bg-green-500 border-2 rounded-lg py-3 mt-2 mx-2 px-6 font-bold text-white">
          Back To the Home Page
        </button>
      </Link>
    </div>
  );
};
