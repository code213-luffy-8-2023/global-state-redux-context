import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchSingleMovieFailure,
  fetchSingleMovieStart,
  fetchSingleMovieSuccess,
} from "../slices/singleMovieSlice";
import { Spinner } from "../components/Spinner";

const SINGLE_MOVIE_API_URL =
  "https://yts.mx/api/v2/movie_details.json?movie_id=";

const fetchSingleMovie = async (id, signal) => {
  const response = await fetch(SINGLE_MOVIE_API_URL + id, {
    signal,
  });
  const data = await response.json();
  return data.data.movie;
};

export const SingleMovie = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const { movie: singleMovie } = useSelector((state) => state.singleMovie);

  const { id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const movie = movies.movies.find((movie) => movie.id == id);
    if (movie) {
      dispatch(fetchSingleMovieSuccess(movie));
    } else {
      // we need to get the movie from the server
      dispatch(fetchSingleMovieStart());
      fetchSingleMovie(id, abortController.signal)
        .then((result) => dispatch(fetchSingleMovieSuccess(result)))
        .catch((error) =>
          dispatch(fetchSingleMovieFailure(error.message || "Error"))
        );
    }

    return () => {
      abortController.abort();
    };
  }, [id, movies, dispatch]);

  return (
    <div>
      <Link to="/">Back to movies list</Link>
      <h1
        style={{
          textAlign: "center",
          marginTop: "2rem",
        }}
      >
        Single Movie
      </h1>
      {singleMovie.isLoading ? (
        <Spinner width={96} height={96} />
      ) : singleMovie.error ? (
        <h2>{singleMovie.error}</h2>
      ) : (
        <div className="single-movie">
          <img src={singleMovie.medium_cover_image} alt={singleMovie.title} />
          <h2>{singleMovie.title}</h2>

          {singleMovie.yt_trailer_code ? (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${singleMovie.yt_trailer_code}`}
              title={singleMovie.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <h3>No trailer available</h3>
          )}
        </div>
      )}
    </div>
  );
};
