import Axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import AsteroidFilters from '../components/AsteroidFilters';
import AsteroidList from '../components/AsteroidList';
import { handleSearch } from '../utils/helpers/asteroid-helpers';
import { sortedAndFilteredAsteroids } from '../utils/helpers/sorting-helpers';
import { getAllAsteroids } from '../utils/services/asteroid-service';
import { Asteroid, Filters } from '../utils/types';

const Asteroids = () => {
	const [filters, setFilters] = useState<Filters>({ dates: null, sortKey: '', showOnlyFavorites: false });
	const [loading, setLoading] = useState(true);
	const [asteroids, setAsteroids] = useState<Asteroid[]>([]);

	useEffect(() => {
		const ourRequest = Axios.CancelToken.source();
		if (filters.dates?.length === 2 && filters.dates[0] && filters.dates[1]) {
			setLoading(true);
			handleSearch(filters.dates, ourRequest).then(showAsteroids).catch((err) => console.log(err));
		} else if (filters.dates === null || (!filters.dates[0] && !filters.dates[1])) {
			setLoading(true);
			getAllAsteroids(ourRequest).then(showAsteroids).catch((err) => console.log(err));
		}
		return () => ourRequest.cancel();
	}, [filters.dates]);

	// show asteroids after fetching them
	const showAsteroids = (asteroids: Asteroid[]) => { setAsteroids(asteroids); setLoading(false); };

	// sort and filter asteroids, using useMemo to memoize the result
	const asteroidsToDisplay = useMemo(() => sortedAndFilteredAsteroids(filters, asteroids), [filters, asteroids]);

	return (
		<>
			<AsteroidFilters onFiltersChange={setFilters} />
			<AsteroidList asteroids={asteroidsToDisplay} loading={loading}></AsteroidList>
		</>
	);
};

export default Asteroids;
