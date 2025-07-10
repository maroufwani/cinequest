import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (query) {
      searchMovies(query, 1);
    }
  }, [query]);

  const searchMovies = async (searchQuery, page = 1) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(searchQuery)}&page=${page}`
      );
      
      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }
      
      setTotalPages(data.total_pages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to search movies:', error);
      setError('Failed to search movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (currentPage < totalPages && !loading) {
      searchMovies(query, currentPage + 1);
    }
  };

  if (!query) {
    return (
      <div className="container">
        <h1>Search Movies</h1>
        <p>Enter a search term to find movies.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Search Results for "{query}"</h1>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {loading && currentPage === 1 && (
        <div className="loading">Searching movies...</div>
      )}
      
      {movies.length > 0 ? (
        <>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          
          {currentPage < totalPages && (
            <div className="load-more-container">
              <button 
                onClick={loadMore} 
                disabled={loading}
                className="btn load-more-btn"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      ) : (
        !loading && (
          <div className="no-results">
            <p>No movies found for "{query}". Try a different search term.</p>
          </div>
        )
      )}
    </div>
  );
};

export default Search;
