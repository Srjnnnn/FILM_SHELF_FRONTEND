import { useLazyQuery } from "@apollo/client";
import { GET_NAMES } from '../constants/Constants'
import { Loading } from "../components/Loading";
import { NameBaseComponent } from "../components/NameBaseComponent";

function Names(props) {
  const [getNames, { loading, error, data }] = useLazyQuery(
    GET_NAMES,
    {
      variables: { primaryName: props.result },
    }
  );

  if (loading)
    return (
      Loading()
    );
  if (error) return `Error! ${error}`;
  return (
    NameBaseComponent(data, getNames)
  );
}

export default Names;
