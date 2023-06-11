import { Asteroid } from '../models/asteroid-interface';

// Checks if an asteroid is in the set of favorite asteroids
export function isAsteroidFavorite(id: string, favoriteAsteroids: Set<string>): boolean {
	return favoriteAsteroids.has(id);
}

// Maps an array of asteroids to the Asteroid interface, including the favorite status
export function mapAsteroids(asteroids: any[], favoriteAsteroids: Set<string>): Asteroid[] {
	return asteroids.map((asteroid) => mapAsteroid(asteroid, favoriteAsteroids));
}

// Maps an individual asteroid object to the Asteroid interface, including the favorite status
export function mapAsteroid(asteroid: any, favoriteAsteroids: Set<string>): Asteroid {
	return {
		id: asteroid.id,
		name: asteroid.name,
		nasa_jpl_url: asteroid.nasa_jpl_url,
		absolute_magnitude_h: asteroid.absolute_magnitude_h,
		is_potentially_hazardous_asteroid: asteroid.is_potentially_hazardous_asteroid,
		diameter: `${asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - ${asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)}`,
		relative_velocity: asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour,
		miss_distance: asteroid.close_approach_data[0].miss_distance.kilometers,
		close_approach_date_full: asteroid.close_approach_data[0].close_approach_date_full,
		is_favorite: isAsteroidFavorite(asteroid.id, favoriteAsteroids) // Check if the asteroid is a favorite
	};
}
