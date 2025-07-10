import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Discover from './pages/Discover';
import Queue from './pages/Queue';
import Watched from './pages/Watched';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import { GlobalContext } from './context/GlobalState';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { userInfo } = useContext(GlobalContext);
  return userInfo ? children : <Navigate to="/login" />;
};

function App() {
  const { userInfo } = useContext(GlobalContext);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={userInfo ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={userInfo ? <Navigate to="/" /> : <Register />} />
        
        <Route path="/" element={
          <PrivateRoute><Discover /></PrivateRoute>
        } />
        <Route path="/search" element={
          <PrivateRoute><Search /></PrivateRoute>
        } />
        <Route path="/queue" element={
          <PrivateRoute><Queue /></PrivateRoute>
        } />
        <Route path="/watched" element={
          <PrivateRoute><Watched /></PrivateRoute>
        } />
        <Route path="/movie/:id" element={
          <PrivateRoute><MovieDetails /></PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;