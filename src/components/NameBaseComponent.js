import { getFromLocalStorage } from '../Helpers/LocalStorage';

export const NameBaseComponent = (data, getNames, addToFav, props) => {
  let i = 0;
  return (
    <div className="mx-3 p-2 box-border">
      {data?.names &&
        data.names.map((name) => {
          const replacedProfession = name.primaryProfession.replaceAll(
            "_",
            " "
          );
          return (
            <div
              key={i++}
              className="w-full p-4 text-center bg-red-50 shadow-2xl mx-4 my-3 border-2 rounded-lg"
            >
              <div>
                <b>{name.primaryName}</b>
              </div>
              <div>{replacedProfession}</div>
              <div>{name.birthYear}</div>
              <div>{name.deathYear}</div>
              <div>
                <div>
                  <button
                    className={`bg-blue-400 border-2 rounded-lg py-2 mt-2 mx-auto px-4 font-bold text-white w-1/4 ${props.isLoggedIn ? '' : 'hidden'}`}
                    onClick={() => addToFav({variables: {email: getFromLocalStorage("filmShelfSessionKey")['email'], useCase: 'favorite_actors', result: name.primaryName, sessionKey: getFromLocalStorage("filmShelfSessionKey")['sessionKey']}})}
                  >
                    Add to Fav!
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      <div className="text-center mt-6">
        <button
          className="bg-green-500 border-2 rounded-lg py-3 mt-2 mx-2 px-6 font-bold text-white"
          onClick={() => getNames()}
        >
          Fetch!
        </button>
      </div>
    </div>
  );
};
