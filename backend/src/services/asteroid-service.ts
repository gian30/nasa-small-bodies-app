import Axios from 'axios';
import { CacheOptions, setupCache } from 'axios-cache-interceptor';
import { Service } from 'typedi';
import { Asteroid } from '../models/asteroid-interface';
import { mapAsteroids } from '../utils/asteroid-utils';
import { API_KEY, BASE_URL } from '../utils/constants';

// Configure cache options for axios
const cacheOptions: CacheOptions = {
	ttl: 15 * 60 * 1000, // 15 minutes
};
const axios = setupCache(Axios, cacheOptions);

@Service()
export class AsteroidService {
	// Store favorite asteroids in memory (for simplicity, in a real app this would be saved in a database)
	private favoriteAsteroids: Set<string> = new Set();

	public async getAsteroidsByDate(startDate: string, endDate: string): Promise<Asteroid[]> {
		try {
			// Make a GET request to the NASA API to fetch asteroids data for a given date range
			const response = await axios.get(`${BASE_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`);
			const asteroids = Object.values(response.data.near_earth_objects).flat() as Asteroid[];
			return mapAsteroids(asteroids, this.favoriteAsteroids);
		} catch (error) {
			console.error('Error fetching asteroid data:', error);
			throw new Error('Failed to fetch asteroid data');
		}
	}

	public async getAsteroids(): Promise<Asteroid[]> {
		try {
			// Make a GET request to the NASA API to fetch all asteroids data
			const response = await axios.get(`${BASE_URL}?api_key=${API_KEY}`);
			const asteroids = Object.values(response.data.near_earth_objects).flat();
			return mapAsteroids(asteroids, this.favoriteAsteroids);
		} catch (error) {
			console.error('Error fetching asteroid data:', error);
			throw new Error('Failed to fetch asteroid data');
		}
	}

	public addFavoriteAsteroid(id: string): Set<string> {
		// Add an asteroid to the set of favorite asteroids
		this.favoriteAsteroids.add(id);
		return this.favoriteAsteroids;
	}

	public removeFavoriteAsteroid(id: string): Set<string> {
		// Remove an asteroid from the set of favorite asteroids
		this.favoriteAsteroids.delete(id);
		return this.favoriteAsteroids;
	}
}
