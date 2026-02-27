import React, { useState, useEffect, useRef } from 'react';
import './MovieRow.css';

const MovieRow = ({ title, fetchMovies }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const rowRef = useRef(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (error) {
        console.error(`Error loading ${title}:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [fetchMovies, title]);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
      setScrollPosition(scrollTo);
    }
  };

  if (loading) {
    return (
      <div className="movieRow">
        <h2 className="movieRow__title">{title}</h2>
        <div className="movieRow__loading">Loading...</div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="movieRow">
      <h2 className="movieRow__title">{title}</h2>
      <div className="movieRow__container">
        {scrollPosition > 0 && (
          <button 
            className="movieRow__arrow movieRow__arrow--left"
            onClick={() => handleScroll('left')}
          >
            ‹
          </button>
        )}
        
        <div className="movieRow__posters" ref={rowRef}>
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movieRow__posterContainer">
              <img
                className="movieRow__poster"
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}
                alt={movie.Title}
                loading="lazy"
              />
              <div className="movieRow__posterInfo">
                <h3 className="movieRow__posterTitle">{movie.Title}</h3>
                <p className="movieRow__posterYear">{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="movieRow__arrow movieRow__arrow--right"
          onClick={() => handleScroll('right')}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
