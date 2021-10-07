import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_USERS = gql`
  {
    users {
      isLoggedIn
      sessionKeys
      password
      email
      _id
    }
  }
`;

function Users() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  return (
    <div className="flex flex-wrap items-center pb-16">
      {data.users.map((user) => {
            return (
                <div
                  key={user._id}
                  className="lg:w-1/3 w-full p-4 text-center inline"
                >
                  {user._id}
                  {" "}
                  {user.password}
                </div>
              );
      })}
    </div>
  );
}

export default Users;
