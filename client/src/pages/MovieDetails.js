import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addMovieToQueue, moveMovieToWatched, removeMovieFromQueue, removeMovieFromWatched, queue, watched } = useContext(GlobalContext);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&append_to_response=credits,videos`
        );
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
        setError('Failed to load movie details');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="container"><h2>Loading...</h2></div>;
  if (error) return <div className="container"><h2>{error}</h2></div>;
  if (!movie) return <div className="container"><h2>Movie not found</h2></div>;

  const isMovieInQueue = queue.some((m) => m.id === movie.id);
  const isMovieInWatched = watched.some((m) => m.id === movie.id);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750.png?text=No+Image';

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const trailer = movie.videos?.results?.find(video => video.type === 'Trailer' && video.site === 'YouTube');

  return (
    <div className="movie-details">
      {backdropUrl && (
        <div className="movie-backdrop" style={{ backgroundImage: `url(${backdropUrl})` }}>
          <div className="backdrop-overlay"></div>
        </div>
      )}
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <div className="movie-details-content">
          <div className="movie-poster">
            <img src={imageUrl} alt={movie.title} />
          </div>
          <div className="movie-info">
            <h1>{movie.title}</h1>
            {movie.tagline && <p className="tagline">{movie.tagline}</p>}
            
            <div className="movie-meta">
              <span className="rating">★ {movie.vote_average.toFixed(1)}</span>
              <span className="runtime">{formatRuntime(movie.runtime)}</span>
              <span className="release-date">{formatDate(movie.release_date)}</span>
            </div>

            <div className="genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              ))}
            </div>

            <div className="overview">
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>

            <div className="movie-actions">
              {!isMovieInQueue && !isMovieInWatched && (
                <button className="btn" onClick={() => addMovieToQueue(movie)}>
                  Add to Queue
                </button>
              )}
              {isMovieInQueue && (
                <div className="action-buttons">
                  <button className="btn" onClick={() => moveMovieToWatched(movie)}>
                    Mark as Watched
                  </button>
                  <button className="btn btn-secondary" onClick={() => removeMovieFromQueue(movie.id)}>
                    Remove from Queue
                  </button>
                </div>
              )}
              {isMovieInWatched && (
                <div className="action-buttons">
                  <span className="watched-indicator">✓ Watched</span>
                  <button className="btn btn-secondary" onClick={() => removeMovieFromWatched(movie.id)}>
                    Remove from Watched
                  </button>
                </div>
              )}
            </div>

            {trailer && (
              <div className="trailer">
                <h3>Trailer</h3>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {movie.credits?.cast && (
              <div className="cast">
                <h3>Cast</h3>
                <div className="cast-grid">
                  {movie.credits.cast.slice(0, 8).map((actor) => (
                    <div key={actor.id} className="cast-member">
                      <img
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                            : 'https://via.placeholder.com/200x300.png?text=No+Image'
                        }
                        alt={actor.name}
                      />
                      <p className="actor-name">{actor.name}</p>
                      <p className="character-name">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
