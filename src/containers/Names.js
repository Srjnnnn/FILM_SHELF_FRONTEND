import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_NAMES, ADD_TO_FAV } from '../constants/Constants'
import { Loading } from "../components/Loading";
import { NameBaseComponent } from "../components/NameBaseComponent";

function Names(props) {
  const [getNames, { loading, error, data }] = useLazyQuery(
    GET_NAMES,
    {
      variables: { primaryName: props.result },
    }
  );

  const [
    addToFav,
    { loading: checkFavLoading, error: checkFavError},
  ] = useMutation(ADD_TO_FAV);

  if (loading || checkFavLoading)
    return (
      Loading()
    );
  if (error || checkFavError) return `Error! ${error}`;
  return (
    NameBaseComponent(data, getNames, addToFav, props)
  );
}

export default Names;
