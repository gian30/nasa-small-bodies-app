import { CancelTokenSource } from 'axios';
import { Dayjs } from 'dayjs';
import { dateFormat } from '../constants/date-formats';
import { getAsteroidsByDate } from '../services/asteroid-service';
import { Asteroid } from '../types';

// Handle search by date range
export const handleSearch = async (dates: [Dayjs | null, Dayjs | null], cancelToken: CancelTokenSource): Promise<Asteroid[]> => {
	if (dates[0] && dates[1]) {
		const formattedStartDate = dates[0].format(dateFormat);
		const formattedEndDate = dates[1]?.format(dateFormat);
		const response = await getAsteroidsByDate(formattedStartDate, formattedEndDate, cancelToken);
		return response;
	}
	return [];
};



