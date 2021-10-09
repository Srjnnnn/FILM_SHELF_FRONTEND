import { Link } from 'react-router-dom';

export const WelcomeComponent = (email, logOutUser) => (
  <div className="text-center">
    <h2 className="text-center font-serif font-extrabold text-xl">
      <Link to='/User'>Welcome {email}</Link>
    </h2>
    <button
      className="bg-red-500 border-2 rounded-lg py-3 mt-2 mx-2 px-6 font-bold text-white"
      onClick={logOutUser}
    >
      Log Out
    </button>
  </div>
);
