import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

const MovieCard = ({ movie }) => {
  const { addMovieToQueue, queue, watched } = useContext(GlobalContext);

  const isMovieInQueue = queue.some((m) => m.id === movie.id);
  const isMovieInWatched = watched.some((m) => m.id === movie.id);
  const isDisabled = isMovieInQueue || isMovieInWatched;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750.png?text=No+Image';

  return (
    <div className="movie-card">
      <img src={imageUrl} alt={movie.title} />
      <div className="movie-card-info">
        <h3>
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        </h3>
        <button
          className="btn"
          onClick={() => addMovieToQueue(movie)}
          disabled={isDisabled}
        >
          {isMovieInWatched ? 'Watched' : isMovieInQueue ? 'In Queue' : 'Add to Queue'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;