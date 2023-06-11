import { Checkbox, Select } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useEffect, useState } from 'react';
import DateRangePicker from '../components/DateRangePicker';
import { disabledDate } from '../utils/helpers/date-helpers';
import { Filters, RangeValue } from '../utils/types';
const { Option } = Select;

interface AsteroidFiltersProps {
	onFiltersChange: (filters: Filters) => void;
}

const AsteroidFilters: React.FC<AsteroidFiltersProps> = ({ onFiltersChange }) => {
	const [dates, setDates] = useState<RangeValue>(null);
	const [sortKey, setSortKey] = useState('');
	const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

	// handle show only favorites checkbox change and update state showOnlyFavorites
	const handleShowOnlyFavoritesChange = (e: CheckboxChangeEvent) => setShowOnlyFavorites(e.target.checked)

	useEffect(() => {
		onFiltersChange({ dates, sortKey, showOnlyFavorites });
	}, [dates, sortKey, showOnlyFavorites, onFiltersChange]);

	return (
		<div style={styles.filters}>
			<DateRangePicker value={dates} disabledDate={(current) => disabledDate(dates, current)} onCalendarChange={setDates} />
			<Select defaultValue="" style={styles.select} onChange={setSortKey}>
				<Option value="">Sort By</Option>
				<Option value="name">Name</Option>
				<Option value="relative_velocity">Relative velocity</Option>
				<Option value="absolute_magnitude">Absolute magnitude</Option>
			</Select>
			<Checkbox onChange={handleShowOnlyFavoritesChange}>Show only favorites</Checkbox>
		</div>
	);
};

const styles = {
	filters: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '15px',
		padding: '25px 0',
		WebkitTouchCallout: 'none',
		WebkitUserSelect: 'none',
		KhtmlUserSelect: 'none',
		MozUserSelect: 'none',
		MsUserSelect: 'none',
		userSelect: 'none',
		flexWrap: 'wrap',
	} as React.CSSProperties,
	select: {
		width: '200px',
	} as React.CSSProperties,
};

export default AsteroidFilters;
