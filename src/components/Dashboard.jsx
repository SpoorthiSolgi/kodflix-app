import React, { useEffect, useState } from 'react';
import { logout, getCurrentUser, verifyToken } from '../services/auth';
import Navbar from './Navbar';
import Hero from './Hero';
import MovieRow from './MovieRow';
import {
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchActionMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
} from '../services/tmdb';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        onLogout?.();
        return;
      }

      // Verify token is still valid
      const result = await verifyToken();
      if (!result.success) {
        onLogout?.();
        return;
      }

      setUser(currentUser);
      setLoading(false);
    };

    checkAuth();
  }, [onLogout]);

  const handleLogout = () => {
    logout();
    onLogout?.();
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={handleLogout} />
      <Hero />
      <div className="dashboard__content">
        <MovieRow title="Popular on Netflix" fetchMovies={fetchPopularMovies} />
        <MovieRow title="Trending Now" fetchMovies={fetchTrendingMovies} />
        <MovieRow title="Top Rated" fetchMovies={fetchTopRatedMovies} />
        <MovieRow title="Action Movies" fetchMovies={fetchActionMovies} />
        <MovieRow title="Comedy Movies" fetchMovies={fetchComedyMovies} />
        <MovieRow title="Horror Movies" fetchMovies={fetchHorrorMovies} />
      </div>
      <footer className="app__footer">
        <div className="app__footerContent">
          <p>&copy; 2024 Kodflix. All rights reserved.</p>
          <p>Data provided by OMDb API</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
