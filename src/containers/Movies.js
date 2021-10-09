import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_MOVIES, ADD_TO_FAV  } from '../constants/Constants';
import { Loading } from "../components/Loading";
import { MovieBaseComponent } from "../components/MovieBaseComponent";

function Movies(props) {
  const [getMovies, { loading, error, data }] = useLazyQuery(
    GET_MOVIES,
    {
      variables: { originalTitle: props.result },
    }
  );

  const [
    addToFav,
    { loading: checkFavLoading, error: checkFavError },
  ] = useMutation(ADD_TO_FAV);

  if (loading || checkFavLoading)
    return (
      Loading()
    );
  if (error || checkFavError) return `Error! ${error}`;
  return (
    MovieBaseComponent(data, getMovies, addToFav, props)
  );
}

export default Movies;
