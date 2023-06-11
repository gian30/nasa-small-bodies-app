import axios, { CancelTokenSource } from 'axios';
import { Asteroid } from '../types';
const baseURL = process.env.REACT_APP_API_BASE_URL;
const api = axios.create({ baseURL });

// get all asteroids by date range
export const getAsteroidsByDate = (startDate: string, endDate: string, cancelToken: CancelTokenSource) => api.get('/asteroids', { cancelToken: cancelToken.token, params: { startDate, endDate } }).then(res => res.data) as Promise<Asteroid[]>;
// get all asteroids
export const getAllAsteroids = (cancelToken: CancelTokenSource) => api.get('/asteroids', { cancelToken: cancelToken.token }).then(res => res.data) as Promise<Asteroid[]>;
// add to favorites
export const addToFavorites = (asteroidId: string): Promise<void> => api.post(`/asteroids/favorites/${asteroidId}`, {});
// remove from favorites
export const removeFromFavorites = (asteroidId: string): Promise<void> => api.delete(`/asteroids/favorites/${asteroidId}`)


