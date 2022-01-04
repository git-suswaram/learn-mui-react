import {
	Checkbox as MuiCheckbox,
	FormControl,
	FormControlLabel,
} from '@mui/material';
import React from 'react';

const convertToDefaultParams = (name, value) => ({
	target: {
		name,
		value,
	},
});

const Checkbox = (props) => {
	const { label, name, value, onChange } = props;
	return (
		<FormControl>
			<FormControlLabel
				label={label}
				control={
					<MuiCheckbox
						name={name}
						color='primary'
						checked={value}
						onChange={(e) =>
							onChange(convertToDefaultParams(name, e.target.checked))
						}
					/>
				}
			/>
		</FormControl>
	);
};

export default Checkbox;
