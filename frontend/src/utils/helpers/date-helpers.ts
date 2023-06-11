import { Dayjs } from 'dayjs';
// disable dates that are more than 7 days apart
export const disabledDate = (dates: [Dayjs | null, Dayjs | null] | null, current: Dayjs): boolean => {
	if (!dates) {
		return false;
	}
	const tooLate = dates[0] && current.diff(dates[0], 'days') >= 7;
	const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 7;
	return !!tooEarly || !!tooLate;
};