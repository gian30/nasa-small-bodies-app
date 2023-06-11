export const apiResponseMock = {
	data: {
		near_earth_objects: [
			{
				id: "2002063",
				name: "2063 Bacchus (1977 HB)",
				nasa_jpl_url: "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2002063",
				absolute_magnitude_h: 17.25,
				estimated_diameter: {
					kilometers: {
						estimated_diameter_min: 0.9430939886,
						estimated_diameter_max: 2.1088222676,
					},
				},
				is_potentially_hazardous_asteroid: false,
				close_approach_data: [
					{
						relative_velocity: {
							kilometers_per_hour: "35008.5838039732",
						},
						miss_distance: {
							kilometers: "69121099.132475931",
						},
						close_approach_date_full: "2023-Jun-11 13:14",
					},
				],
			},
		],
	},
};
