export const UserCreationComponent = (createUser) => (
  <div className="text-center">
    <p className="font-bold text-red-500">
      Warning! We can't find that user! Do you want to register with these
      credentials?
    </p>
    <div>
      <button
        className="bg-blue-500 border-2 rounded-lg py-3 mt-2 mx-2 px-6 font-bold text-white"
        onClick={() => {
          createUser();
        }}
      >
        Yes
      </button>
      <button
        className="bg-blue-500 border-2 rounded-lg py-3 mt-2 mx-2 px-6 font-bold text-white"
        onClick={() => {
          window.location.reload();
        }}
      >
        No
      </button>
    </div>
  </div>
);
