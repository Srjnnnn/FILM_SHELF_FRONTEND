import { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_USER,
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
} from "../constants/Constants";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../Helpers/LocalStorage";
import { UserCreationComponent } from "../components/UserCreationComponent";
import { NotLoggedInUserComponent } from "../components/NotLoggedInUserComponent";
import { WelcomeComponent } from "../components/WelcomeComponent";
import { BaseComponent } from "../components/BaseComponent";
import { Loading } from "../components/Loading";

function LoginBar(props) {
  const passwordVariable = props.result[1];
  const emailVariable = props.result[0];
  const [sessionKeyState, setSessionKeyState] = useState({
    sessionKeyVar: "",
    isLoggedInState: false,
  });

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
      data?.login &&
        data?.login.sessionKey &&
        setToLocalStorage(data.login.sessionKey, data.login.userMail);
      checkLoginStatus();
    },
  });

  const [logOutUser, { loading: checkLogOutLoading, error: checkLogOutError }] =
    useLazyQuery(LOGOUT_USER, {
      variables: {
        email: getFromLocalStorage("filmShelfSessionKey")
          ? getFromLocalStorage("filmShelfSessionKey")["email"]
          : "",
        sessionKey: getFromLocalStorage("filmShelfSessionKey")
          ? getFromLocalStorage("filmShelfSessionKey")["sessionKey"]
          : "",
      },
      onCompleted: () => {
        localStorage.removeItem("filmShelfSessionKey");
        checkLoginStatus();
        window.location.reload();
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
    },
  });

  const checkLoginStatus = () => {
    const sessionVariable = getFromLocalStorage("filmShelfSessionKey");
    if (sessionVariable) {
      setSessionKeyState({
        sessionKeyVar: sessionVariable["sessionKey"],
        isLoggedInState: true,
      });
    } else {
      setSessionKeyState({ sessionKeyVar: "", isLoggedInState: false });
    }
    return sessionVariable;
  };

  const status = sessionKeyState["isLoggedInState"];

  useEffect(() => {
    const trigger = checkLoginStatus();
    let sessionKey = null;
    if (trigger) {
      sessionKey = trigger["sessionKey"];
    }
    sessionKey
      ? setSessionKeyState({ sessionKeyVar: sessionKey, isLoggedInState: true })
      : setSessionKeyState({ sessionKeyVar: "", isLoggedInState: false });
  }, [status]);

  if (
    checkUserLoading ||
    checkLogLoading ||
    checkCreateLoading ||
    checkLogOutLoading
  )
    return (
      Loading()
    );
  if (checkUserError) return `Error! ${checkUserError}`;
  if (checkLogError) return `Error! ${checkLogError}`;
  if (checkCreateError) return `Error! ${checkCreateError}`;
  if (checkLogOutError) return `Error! ${checkLogOutError}`;

  if (
    userData &&
    !userData?.user &&
    logData &&
    logData?.login &&
    !logData?.login.isLoggedIn &&
    !createData
  ) {
    return UserCreationComponent(createUser);
  }

  if (
    userData &&
    userData?.user &&
    logData &&
    logData?.login &&
    !logData?.login.isLoggedIn
  )
    return NotLoggedInUserComponent();

  if (sessionKeyState.isLoggedInState) {
    const sessionVariable = getFromLocalStorage("filmShelfSessionKey");
    const email = sessionVariable["email"];
    return WelcomeComponent(email, logOutUser);
  }

  return BaseComponent(props, checkUser, sessionKeyState);
}

export default LoginBar;
