import { beforeEach, afterEach, describe, expect, it, jest } from '@jest/globals';
import axios from 'axios';
import { AsteroidService } from '../src/services/asteroid-service';
import { apiResponseMock } from './test-utils';

describe('AsteroidService', () => {
	let asteroidService: AsteroidService;

	beforeEach(() => {
		asteroidService = new AsteroidService();
	});
	afterEach(() => {
		jest.restoreAllMocks();
	});
	describe('getAsteroidsByDate', () => {
		const startDate = '2023-06-10';
		const endDate = '2023-06-11';
		jest.spyOn(axios, 'get').mockResolvedValue(apiResponseMock);
		const asteroidMock = apiResponseMock.data.near_earth_objects[0];
		it('should process and return asteroid data with correct mappings', async () => {
			const asteroids = await asteroidService.getAsteroidsByDate(startDate, endDate);
			expect(asteroids.length).toBe(1);
			expect(asteroids[0].id).toBe(asteroidMock.id);
			expect(asteroids[0].name).toBe(asteroidMock.name);
			expect(asteroids[0].id).toBe(asteroidMock.id);
			expect(asteroids[0].name).toBe(asteroidMock.name);
			expect(asteroids[0].nasa_jpl_url).toBe(asteroidMock.nasa_jpl_url);
			expect(asteroids[0].absolute_magnitude_h).toBe(asteroidMock.absolute_magnitude_h);
			expect(asteroids[0].is_potentially_hazardous_asteroid).toBe(asteroidMock.is_potentially_hazardous_asteroid);
			expect(asteroids[0].diameter).toBe(`${asteroidMock.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - ${asteroidMock.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)}`);
			expect(asteroids[0].relative_velocity).toBe(asteroidMock.close_approach_data[0].relative_velocity.kilometers_per_hour);
			expect(asteroids[0].miss_distance).toBe(asteroidMock.close_approach_data[0].miss_distance.kilometers);
			expect(asteroids[0].close_approach_date_full).toBe(asteroidMock.close_approach_data[0].close_approach_date_full);
			expect(asteroids[0].is_favorite).toBe(false);
		});

		it('should set is_favorite to true if the asteroid has been added to favorites', async () => {
			asteroidService.addFavoriteAsteroid('2002063')
			const asteroids = await asteroidService.getAsteroidsByDate(startDate, endDate);
			expect(asteroids[0].is_favorite).toBe(true);
		});
		it('should set is_favorite to false if the asteroid has been removed from favorites', async () => {
			asteroidService.removeFavoriteAsteroid('2002063')
			const asteroids = await asteroidService.getAsteroidsByDate(startDate, endDate);
			expect(asteroids[0].is_favorite).toBe(false);
		});

		it('should throw an error if the API call fails', async () => {
			const startDate = '2023-06-10';
			const endDate = '2023-06-11';
			jest.spyOn(axios, 'get').mockRejectedValue(new Error('Failed to fetch asteroid data'));
			await expect(asteroidService.getAsteroidsByDate(startDate, endDate)).rejects.toThrow('Failed to fetch asteroid data');
		});
	});
});
