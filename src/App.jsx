import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import {
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchActionMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
} from './services/tmdb';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <div className="app__content">
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
}

export default App;
