export const NotLoggedInUserComponent = () => (
  <div className="text-center">
    <p className="font-bold text-red-500">
      Error! The password is wrong! Please refresh the page and try again...
    </p>
    <button
      className="bg-blue-500 border-2 rounded-lg py-3 mt-2 mx-2 px-6 font-bold text-white"
      onClick={() => {
        window.location.reload();
      }}
    >
      Refresh
    </button>
  </div>
);
