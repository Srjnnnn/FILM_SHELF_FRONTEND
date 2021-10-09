export const NameBaseComponent = (data, getNames) => (
  <div>
    {data?.names &&
      data.names.map((name) => {
        const replacedProfession = name.primaryProfession.replaceAll("_", " ");
        return (
          <div
            key={name._id}
            className="w-full p-4 text-center bg-red-50 shadow-2xl m-4 border-2 rounded-lg"
          >
            <div>
              <b>{name.primaryName}</b>
            </div>
            <div>{replacedProfession}</div>
            <div>{name.birthYear}</div>
            <div>{name.deathYear}</div>
            <div>
              <div>
                {name.knownForTitles.map((title) => (
                  <div>
                    <button>{title}</button>
                  </div>
                ))}
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
