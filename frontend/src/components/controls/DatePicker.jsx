import React from 'react';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';

const convertToDefaultParams = (name, value) => ({
	target: {
		name,
		value,
	},
});

const DatePicker = (props) => {
	const { name, label, value, onChange } = props;

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DesktopDatePicker
				label={label}
				name={name}
				value={value}
				onChange={(date) => onChange(convertToDefaultParams(name, date))}
				inputFormat='MM/dd/yyyy'
				renderInput={(params) => <TextField {...params} />}
			/>
		</LocalizationProvider>
	);
};

export default DatePicker;
