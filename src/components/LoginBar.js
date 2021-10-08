import React from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

const GET_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      isLoggedIn
      sessionKeys
      password
      createdAt
      updatedAt
    }
  }
`;

const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userMail
      isLoggedIn
      sessionKey
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(input: { email: $email, password: $password }) {
      isLoggedIn
      sessionKeys
      email
      _id
      password
      createdAt
      updatedAt
    }
  }
`;

function LoginBar(props) {
  const [
    checkUser,
    { loading: checkUserLoading, error: checkUserError, data: userData },
  ] = useLazyQuery(GET_USER, {
    variables: { email: props.result[0] },
  });

  const [
    logInUser,
    { loading: checkLogLoading, error: checkLogError, data: logData },
  ] = useLazyQuery(LOGIN_USER, {
    variables: { email: props.result[0], password: props.result[1] },
  });

  const [
    createUser,
    { loading: checkCreateLoading, error: checkCreateError, data: createData },
  ] = useMutation(CREATE_USER, {
    variables: { email: props.result[0], password: props.result[1] },
  });

  if (checkUserLoading || checkLogLoading)
    return (
      <div>
        <p>Loading ...</p>
      </div>
    );
  if (checkUserError) return `Error! ${checkUserError}`;
  if (checkLogError) return `Error! ${checkLogError}`;

  if (
    userData &&
    !userData?.user &&
    logData &&
    logData?.login &&
    !logData?.login.isLoggedIn
  ) {
    return (
      <div>
        <p>
          Error! We can't find that user! Do you want to register with these
          credentials?.
        </p>
        <button
          className="bg-blue-500 border-2 rounded-lg py-3 mt-2 mx-2 px-6 font-bold text-white"
          onClick={() => {
            createUser();
            logInUser();
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
    );
  }
  if (
    userData &&
    userData?.user &&
    logData &&
    logData?.login &&
    !logData?.login.isLoggedIn
  )
    return `Error! The password is wrong! Please refresh the page and try again.`;

  return (
    <div>
      <div className="grid grid-cols-6">
        <input
          className="border-2 rounded-lg py-3 mt-2 mx-2 px-6 col-start-3"
          value={props.result[0]}
          placeholder={props.placeholder[0]}
          onChange={(e) => props.loginChange(e, "email")}
          name={props.name[0]}
        />
        <input
          className="border-2 rounded-lg py-3 mt-2 mx-2 px-6"
          value={props.result[1]}
          placeholder={props.placeholder[1]}
          onChange={(e) => props.loginChange(e, "password")}
          name={props.name[1]}
          type={props.name[1]}
        />
      </div>
      <div className="text-center mt-4">
        <button
          className="bg-blue-500 border-2 rounded-lg py-3 mt-2 mx-2 px-6 font-bold text-white"
          onClick={() => {
            checkUser();
            logInUser();
          }}
        >
          Submit
        </button>
        <button className="bg-red-500 border-2 rounded-lg py-3 mt-2 mx-2 px-6 font-bold text-white">
          Log Out
        </button>
      </div>
    </div>
  );
}

export default LoginBar;
