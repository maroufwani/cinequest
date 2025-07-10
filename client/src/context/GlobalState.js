import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';
import api from '../api/axios';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  queue: [],
  watched: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    if (state.userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
      fetchWatchlist();
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [state.userInfo]);

  const getConfig = () => ({
    headers: {
      Authorization: `Bearer ${state.userInfo.token}`,
    },
  });

  // Actions
  const login = (userData) => {
    dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const fetchWatchlist = async () => {
    try {
      const { data } = await api.get('/watchlist', getConfig());
      dispatch({ type: 'SET_WATCHLIST', payload: data });
    } catch (error) {
      console.error('Could not fetch watchlist', error);
    }
  };

  const addMovieToQueue = async (movie) => {
    try {
      const { data } = await api.post('/watchlist/queue', movie, getConfig());
      dispatch({ type: 'UPDATE_QUEUE', payload: data });
    } catch (error) {
      console.error('Could not add to queue', error);
    }
  };

  const removeMovieFromQueue = async (movieId) => {
    try {
      const { data } = await api.delete(`/watchlist/queue/${movieId}`, getConfig());
      dispatch({ type: 'UPDATE_QUEUE', payload: data });
    } catch (error) {
      console.error('Could not remove from queue', error);
    }
  };

  const moveMovieToWatched = async (movie) => {
      try {
          const { data } = await api.post('/watchlist/watched', movie, getConfig());
          dispatch({ type: 'UPDATE_WATCHED', payload: data });
      } catch (error) {
          console.error('Could not move to watched', error);
      }
  }

  const removeMovieFromWatched = async (movieId) => {
    try {
      console.log('Removing movie from watched with ID:', movieId);
      console.log('Request URL:', `/watchlist/watched/${movieId}`);
      console.log('Auth config:', getConfig());
      
      const { data } = await api.delete(`/watchlist/watched/${movieId}`, getConfig());
      console.log('Response data:', data);
      dispatch({ type: 'UPDATE_WATCHED_LIST', payload: data });
    } catch (error) {
      console.error('Could not remove from watched', error);
      console.error('Error details:', error.response?.data);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        login,
        logout,
        addMovieToQueue,
        removeMovieFromQueue,
        moveMovieToWatched,
        removeMovieFromWatched,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};