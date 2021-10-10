import { useQuery } from "@apollo/client";
import { FEATURED_MOVIES  } from '../constants/Constants';
import { Loading } from "../components/Loading";
import { Featured } from "../components/Featured";

function Movies(props) {
  const { loading, error, data } = useQuery(
    FEATURED_MOVIES, {
        pollInterval: 600000,
    }
  );


  if (loading)
    return (
      Loading()
    );
  if (error) return `Error! ${error}`;
  return (
    Featured(data)
  );
}

export default Movies;
