import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

export const UpdateComponent = (
  userData,
  SearchBar,
  handleChange,
  newPasswordResult,
  updateUser
  // MovieData
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
          {userData.user.favoriteMovies.map((movie) => {
            return (
              <div key={i++}>
                <p className="w-max">
                  <b>{movie}</b>
                </p>
              </div>
            );
          })}
        </div>
        <div className="mx-6">
          <h3 className="text-center font-serif font-extrabold text-xl pt-4 custom mb-3 w-max">
            Favorite Actors
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
      <div className="flex justify-center mt-8">
        <h3 className="text-center font-serif font-extrabold text-3xl pt-4 custom mb-3 mt-4 w-max">
          Recommendations
        </h3>
      </div>
      <div className="flex justify-center mt-8">
        <Carousel
          autoPlay={true}
          interval={2000}
          emulateTouch={true}
          infiniteLoop={true}
          showThumbs={false}
        >
          {userData.user.userSuggestions.map((movie) => {
            i++;
            return (
              <div className="flex justify-center mx-2" key={i}>
                <div className="my-4 bg-pink-50 shadow-2xl border-2 rounded-lg">
                  <div className="my-2 py-4 px-3 font-serif font-extrabold text-xl text-indigo-600">
                    {movie}
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className="flex justify-center mt-8">
        <h3 className="text-center font-serif font-extrabold text-xl pt-4 custom mb-3 mt-4 w-max">
          Update Your Password
        </h3>
      </div>
      <div className="mt-10 mb-5">
        <SearchBar
          name={"newPassword"}
          placeholder={"new Password"}
          searchChange={(e) => handleChange(e, "newPassword")}
          result={newPasswordResult}
          type="password"
        />
      </div>
      <button
        className="bg-blue-500 border-2 rounded-lg py-3 mt-2 mx-2 px-6 font-bold text-white mb-8"
        onClick={() => updateUser()}
      >
        Update Password
      </button>

      <Link to="/">
        <button className="bg-green-500 border-2 rounded-lg py-3 mt-2 mx-2 px-6 font-bold text-white mb-8">
          Back To the Home Page
        </button>
      </Link>
    </div>
  );
};
