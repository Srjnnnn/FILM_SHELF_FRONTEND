import React, { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_USER, CREATE_USER, LOGIN_USER } from '../constants/Constants';
import { getFromLocalStorage, setToLocalStorage } from '../Helpers/LocalStorage';



function LoginBar(props) {
  const passwordVariable = props.result[1];
  const emailVariable = props.result[0];
  const [sessionKeyState, setSessionKeyState] = useState({sessionKeyVar: '', isLoggedInState: false})

  const [
    checkUser,
    { loading: checkUserLoading, error: checkUserError, data: userData },
  ] = useLazyQuery(GET_USER, {
    variables: { email: emailVariable },
    onCompleted: () => logInUser(),
  });

  const [
    logInUser,
    { loading: checkLogLoading, error: checkLogError, data: logData },
  ] = useLazyQuery(LOGIN_USER, {
    variables: { email: emailVariable, password: passwordVariable },
    onCompleted: (data) => {
      (data?.login && data?.login.sessionKey) && setToLocalStorage(data.login.sessionKey, data.login.userMail);
      checkLoginStatus();
    },
  });

  const [
    createUser,
    { loading: checkCreateLoading, error: checkCreateError, data: createData },
  ] = useMutation(CREATE_USER, {
    variables: { email: emailVariable, password: passwordVariable },
    refetchQueries: [
      {
        query: LOGIN_USER,
        variables: { email: emailVariable, password: passwordVariable },
      },
      { query: GET_USER, variables: { email: emailVariable } },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setToLocalStorage(logData.login.sessionKey, logData.login.userMail);
      checkLoginStatus();
    }
  });

  const checkLoginStatus = () => {
    const sessionVariable = getFromLocalStorage('filmShelfSessionKey')
    if (sessionVariable) { 
      setSessionKeyState({sessionKeyVar: sessionVariable['sessionKey'], isLoggedInState: true })
      return (
        sessionVariable
      )
     }
  }

  const status = sessionKeyState['isLoggedInState']

  useEffect(() => {
    const trigger = checkLoginStatus()
    let sessionKey = null
    if (trigger) {
      sessionKey = trigger['sessionKey']
    }
    sessionKey ? setSessionKeyState({sessionKeyVar: sessionKey, isLoggedInState: true}) : setSessionKeyState({sessionKeyVar: '', isLoggedInState: false});
  }, [status]);

  if (checkUserLoading || checkLogLoading || checkCreateLoading)
    return (
      <div>
        <p>Loading ...</p>
      </div>
    );
  if (checkUserError) return `Error! ${checkUserError}`;
  if (checkLogError) return `Error! ${checkLogError}`;
  if (checkCreateError) return `Error! ${checkCreateError}`;

  if (
    userData &&
    !userData?.user &&
    logData &&
    logData?.login &&
    !logData?.login.isLoggedIn &&
    !createData
  ) {
    return (
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
  }

  if (
    userData &&
    userData?.user &&
    logData &&
    logData?.login &&
    !logData?.login.isLoggedIn
  )
    return (
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

  if (sessionKeyState.isLoggedInState) {
    const sessionVariable = getFromLocalStorage('filmShelfSessionKey')
    const email = sessionVariable['email']
    return (
      <div className="text-center">
        <h2 className="text-center font-serif font-extrabold text-xl">
          Welcome {email}
        </h2>
        <button className="bg-red-500 border-2 rounded-lg py-3 mt-2 mx-2 px-6 font-bold text-white">
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-6">
        <input
          className="border-2 rounded-lg py-3 mt-2 mx-2 px-6 col-start-2 col-span-2"
          value={props.result[0]}
          placeholder={props.placeholder[0]}
          onChange={(e) => props.loginChange(e, "email")}
          name={props.name[0]}
        />
        <input
          className="border-2 rounded-lg py-3 mt-2 mx-2 px-6 col-start-4 col-span-2"
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
