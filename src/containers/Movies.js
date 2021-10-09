import { useLazyQuery } from "@apollo/client";
import { GET_MOVIES } from '../constants/Constants';
import { Loading } from "../components/Loading";
import { MovieBaseComponent } from "../components/MovieBaseComponent";

function Movies(props) {
  const [getMovies, { loading, error, data }] = useLazyQuery(
    GET_MOVIES,
    {
      variables: { originalTitle: props.result },
    }
  );

  if (loading)
    return (
      Loading()
    );
  if (error) return `Error! ${error}`;
  return (
    MovieBaseComponent(data, getMovies)
  );
}

export default Movies;
