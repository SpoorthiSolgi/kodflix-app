import React, { useState, useEffect } from 'react';
import { fetchPopularMovies, fetchMovieDetails } from '../services/tmdb';
import './Hero.css';

const Hero = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHeroMovie = async () => {
      try {
        const movies = await fetchPopularMovies();
        if (movies && movies.length > 0) {
          // Pick a random movie from the results
          const randomMovie = movies[Math.floor(Math.random() * movies.length)];
          const details = await fetchMovieDetails(randomMovie.imdbID);
          setMovie(details);
        }
      } catch (error) {
        console.error('Error loading hero movie:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHeroMovie();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  if (loading) {
    return <div className="hero hero--loading">Loading...</div>;
  }

  if (!movie) {
    return null;
  }

  return (
    <header
      className="hero"
      style={{
        backgroundImage: `url(${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/1920x1080?text=No+Image'})`,
      }}
    >
      <div className="hero__contents">
        <h1 className="hero__title">{movie.Title}</h1>
        <div className="hero__info">
          <span className="hero__rating">{movie.imdbRating} Rating</span>
          <span className="hero__year">{movie.Year}</span>
          <span className="hero__runtime">{movie.Runtime}</span>
        </div>
        <p className="hero__description">{truncate(movie.Plot, 150)}</p>
        <div className="hero__buttons">
          <button className="hero__button hero__button--play">
            <span className="hero__button-icon">▶</span> Play
          </button>
          <button className="hero__button hero__button--info">
            <span className="hero__button-icon">ℹ</span> More Info
          </button>
        </div>
      </div>
      <div className="hero__fadeBottom" />
    </header>
  );
};

export default Hero;
