import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import WatchlistCard from '../components/WatchlistCard';

const Queue = () => {
  const { queue } = useContext(GlobalContext);

  return (
    <div className="container">
      <h1>My Queue</h1>
      {queue.length > 0 ? (
        <div className="movie-grid">
          {queue.map((movie) => (
            <WatchlistCard key={movie.id} movie={movie} type="queue" />
          ))}
        </div>
      ) : (
        <h2>No movies in your queue, add some!</h2>
      )}
    </div>
  );
};

export default Queue;