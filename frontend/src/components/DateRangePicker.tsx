import { DatePicker } from 'antd';
import { Dayjs } from 'dayjs';
import { FC } from 'react';
import { RangeValue } from '../utils/types';
const { RangePicker } = DatePicker;

type DateRangePickerProps = {
	value: RangeValue,
	disabledDate: (current: Dayjs) => boolean,
	onCalendarChange: (val: RangeValue) => void,
};

const DateRangePicker: FC<DateRangePickerProps> = (props) => {
	return (
		<RangePicker {...props} />
	);
};

export default DateRangePicker;



