import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import SearchBar from './SearchBar';

const Header = () => {
  const { userInfo, logout } = useContext(GlobalContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">CineQuest</Link>
      </div>
      {userInfo && (
        <div className="header-search">
          <SearchBar />
        </div>
      )}
      <div className="nav-links">
        {userInfo ? (
          <>
            <Link to="/">Discover</Link>
            <Link to="/queue">My Queue</Link>
            <Link to="/watched">Watched</Link>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;