import axios from 'axios';

const API_KEY = 'a145e9dc';
const BASE_URL = 'https://www.omdbapi.com/';

const tmdb = axios.create({
  baseURL: BASE_URL,
});

// Fetch popular movies (using search with popular keywords)
export const fetchPopularMovies = async () => {
  try {
    // OMDB doesn't have a "popular" endpoint like TMDB, so we'll search for popular movies
    const popularSearches = ['marvel', 'star wars', 'batman', 'avengers', 'action'];
    const randomSearch = popularSearches[Math.floor(Math.random() * popularSearches.length)];
    const response = await tmdb.get(`?s=${randomSearch}&apikey=${API_KEY}`);
    return response.data.Search || [];
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Fetch trending movies
export const fetchTrendingMovies = async () => {
  try {
    const trendingSearches = ['2024', '2023', 'new', 'trending'];
    const randomSearch = trendingSearches[Math.floor(Math.random() * trendingSearches.length)];
    const response = await tmdb.get(`?s=${randomSearch}&apikey=${API_KEY}`);
    return response.data.Search || [];
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

// Fetch top rated movies
export const fetchTopRatedMovies = async () => {
  try {
    const topRatedSearches = ['godfather', 'shawshank', 'dark knight', 'pulp fiction'];
    const randomSearch = topRatedSearches[Math.floor(Math.random() * topRatedSearches.length)];
    const response = await tmdb.get(`?s=${randomSearch}&apikey=${API_KEY}`);
    return response.data.Search || [];
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
};

// Fetch action movies
export const fetchActionMovies = async () => {
  try {
    const response = await tmdb.get(`?s=action&type=movie&apikey=${API_KEY}`);
    return response.data.Search || [];
  } catch (error) {
    console.error('Error fetching action movies:', error);
    return [];
  }
};

// Fetch comedy movies
export const fetchComedyMovies = async () => {
  try {
    const response = await tmdb.get(`?s=comedy&type=movie&apikey=${API_KEY}`);
    return response.data.Search || [];
  } catch (error) {
    console.error('Error fetching comedy movies:', error);
    return [];
  }
};

// Fetch horror movies
export const fetchHorrorMovies = async () => {
  try {
    const response = await tmdb.get(`?s=horror&type=movie&apikey=${API_KEY}`);
    return response.data.Search || [];
  } catch (error) {
    console.error('Error fetching horror movies:', error);
    return [];
  }
};

// Fetch movie details by ID
export const fetchMovieDetails = async (imdbID) => {
  try {
    const response = await tmdb.get(`?i=${imdbID}&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// Search movies
export const searchMovies = async (query) => {
  try {
    const response = await tmdb.get(`?s=${query}&apikey=${API_KEY}`);
    return response.data.Search || [];
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export default tmdb;
