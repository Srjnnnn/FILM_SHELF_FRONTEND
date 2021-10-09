import { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_USER, UPDATE_USER } from "../constants/Constants";
import { getFromLocalStorage } from "../Helpers/LocalStorage";
import { Loading } from "../components/Loading";
import SearchBar from "../containers/SearchBar";
import { UpdateComponent } from "../components/UpdateComponent";

function UserDetails() {
  const [newPasswordResult, setNewPasswordResult] = useState("");

  const {
    loading: checkUserLoading,
    error: checkUserError,
    data: userData,
  } = useQuery(GET_USER, {
    variables: { email: getFromLocalStorage("filmShelfSessionKey")["email"] },
  });

  const [updateUser, { loading: updateUserLoading, error: updateUserError }] =
    useLazyQuery(UPDATE_USER, {
      variables: {
        newPassword: newPasswordResult,
        sessionKey: getFromLocalStorage("filmShelfSessionKey")["sessionKey"],
      },
      onCompleted: () => window.location.reload(),
    });

  if (checkUserLoading || updateUserLoading) return Loading();

  if (checkUserError || updateUserError) return `Error! ${checkUserError}`;

  const handleChange = (e, name) => {
    if (name === "newPassword") setNewPasswordResult(e.target.value);
  };

  return UpdateComponent(
    userData,
    SearchBar,
    handleChange,
    newPasswordResult,
    updateUser
  );
}

export default UserDetails;
