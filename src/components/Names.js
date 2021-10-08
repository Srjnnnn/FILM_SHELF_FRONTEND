import React from "react";
import { gql, useLazyQuery } from "@apollo/client";

const GET_NAMES = gql`
  query names($primaryName: String!) {
    names(primaryName: $primaryName) {
        primaryName
        primaryProfession
        knownForTitles
        birthYear
        deathYear
    }
  }
`;

function Names(props) {
  const [getNames, { loading, error, data }] = useLazyQuery(
    GET_NAMES,
    {
      variables: { primaryName: props.result },
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
      {data?.names &&
        data.names.map((name) => {
            const replacedProfession = name.primaryProfession.replaceAll('_', ' ')
          return (
            <div
              key={name._id}
              className="w-full p-4 text-center inline"
            >
            <div><b>{name.primaryName}</b></div>
            <div>{replacedProfession}</div>
            <div>{name.birthYear}</div>
            <div>{name.deathYear}</div>
            <div><div>{name.knownForTitles.map(title => <div><button>{title}</button></div>)}</div></div>
            </div>
          );
        })}
        <button onClick={() => getNames()}>Refetch!</button>
    </div>
  );
}

export default Names;
