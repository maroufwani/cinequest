import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import WatchlistCard from '../components/WatchlistCard';

const Watched = () => {
  const { watched } = useContext(GlobalContext);

  return (
    <div className="container">
      <h1>Watched Movies</h1>
      {watched.length > 0 ? (
        <div className="movie-grid">
          {watched.map((movie) => (
            <WatchlistCard key={movie.id} movie={movie} type="watched" />
          ))}
        </div>
      ) : (
        <h2>You haven't watched any movies yet!</h2>
      )}
    </div>
  );
};

export default Watched;