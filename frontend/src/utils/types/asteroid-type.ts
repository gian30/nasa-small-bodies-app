export interface Asteroid {
	id: string;
	name: string;
	nasa_jpl_url: string;
	absolute_magnitude_h: number;
	is_potentially_hazardous_asteroid: boolean;
	diameter: string;
	relative_velocity: number;
	miss_distance: number;
	close_approach_date_full: string;
	is_favorite?: boolean;
}