import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

const WatchlistCard = ({ movie, type }) => {
    const { removeMovieFromQueue, moveMovieToWatched, removeMovieFromWatched } = useContext(GlobalContext);

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
                 <div className="watchlist-controls">
                     {type === 'queue' && (
                         <>
                            <button className="btn" onClick={() => moveMovieToWatched(movie)}>Watched</button>
                            <button className="btn" onClick={() => removeMovieFromQueue(movie.id)}>Remove</button>
                         </>
                     )}
                     {type === 'watched' && (
                         <button className="btn" onClick={() => removeMovieFromWatched(movie.id)}>Remove</button>
                     )}
                 </div>
            </div>
        </div>
    );
};

export default WatchlistCard;