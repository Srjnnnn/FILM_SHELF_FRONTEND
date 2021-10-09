import { Link } from "react-router-dom";

export const UpdateComponent = (
  userData,
  SearchBar,
  handleChange,
  newPasswordResult,
  updateUser
) => (
  <div className="text-center mt-10">
    <h1 className="text-center font-serif font-extrabold text-3xl pt-4 bg-green-100 shadow-2xl w-min mx-auto text-red-400 border-2 rounded-lg p-10 custom">
      {userData.user.email}
    </h1>
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
