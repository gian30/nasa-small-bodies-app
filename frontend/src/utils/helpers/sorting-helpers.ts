import { Asteroid, Filters } from '../types';
// sort and filter asteroids
export const sortedAndFilteredAsteroids = (filters: Filters, asteroids: Asteroid[]): Asteroid[] => {
	let sortedAsteroids = filters.showOnlyFavorites
		? asteroids.filter((asteroid) => asteroid.is_favorite)
		: asteroids;
	if (filters.sortKey === 'name') {
		sortedAsteroids = [...sortedAsteroids].sort((a, b) => a.name.localeCompare(b.name));
	} else if (filters.sortKey === 'relative_velocity') {
		sortedAsteroids = [...sortedAsteroids].sort((a, b) => a.relative_velocity - b.relative_velocity);
	} else if (filters.sortKey === 'absolute_magnitude') {
		sortedAsteroids = [...sortedAsteroids].sort((a, b) => a.absolute_magnitude_h - b.absolute_magnitude_h);
	}
	return sortedAsteroids as Asteroid[];
}