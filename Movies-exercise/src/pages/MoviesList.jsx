import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesFailure,
} from "../slices/moviesSlice";
import { Spinner } from "../components/Spinner";

const MOVIE_GENRES = [
  "All",
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short Film",
  "Sport",
  "Superhero",
  "Thriller",
  "War",
  "Western",
];

const fakeSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MOVIES_API_URL = "https://yts.mx/api/v2/list_movies.json?sort_by=rating";
/**
 * @typedef {Object} Movie
 * @property {string} id
 * @property {string} title
 * @property {string} year
 * @property {string} synopsis
 * @property {string} medium_cover_image
 * @property {<Array.<string>>} genres
 * @property {number} rating
 * @property {String} yt_trailer_code
 */

/**
 * Fetches movies from the YTS API
 * @returns {Promise.<Array.<Movie>>}
 */
const fetchMovies = async (query) => {
  await fakeSleep(1000);
  const response = await fetch(MOVIES_API_URL + query);
  const data = await response.json();
  return data.data.movies;
};

export const MoviesList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(fetchMoviesStart());
    fetchMovies(query == "All" ? "" : "&genre=" + query)
      .then((result) => dispatch(fetchMoviesSuccess(result)))
      .catch((error) => dispatch(fetchMoviesFailure(error.message || "Error")));
  }, [dispatch, query]);

  console.log(movies);
  return (
    <div>
      <h1>Movies List</h1>
      <form>
        <label>Filter by genre:</label>
        <select value={query} onChange={(e) => setQuery(e.target.value)}>
          {MOVIE_GENRES.map((genre) => {
            return (
              <option key={genre} value={genre}>
                {genre}
              </option>
            );
          })}
        </select>
      </form>
      {movies.isLoading ? (
        <Spinner width={96} height={96} />
      ) : movies.error ? (
        <h2>{movies.error}</h2>
      ) : (
        <div className="movies-list">
          {movies.movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={movie.medium_cover_image} alt={movie.title} />

              <h2>{movie.title}</h2>

              <div className="rating">
                {" "}
                Rating: <b>{movie.rating}</b>
              </div>
              <div className="chip-container">
                {movie.genres.map((genre) => {
                  return (
                    <div className="chip" key={genre}>
                      {genre}
                    </div>
                  );
                })}
              </div>
              <Link to={`/${movie.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
