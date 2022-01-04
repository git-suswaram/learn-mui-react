import {
	FormControl,
	FormLabel,
	FormControlLabel,
	Radio,
	RadioGroup as MuiRadioGroup,
} from '@mui/material';
import React from 'react';

const RadioGroup = (props) => {
	const { label, name, value, onChange, items, ...others } = props;
	return (
		<FormControl>
			<FormLabel>{label}</FormLabel>
			<MuiRadioGroup
				name={name}
				value={value}
				onChange={onChange}
				row
				{...others}
			>
				{items.map((item, index) => (
					<FormControlLabel
						key={index}
						value={item.id}
						label={item.title}
						control={<Radio size='small' />}
					/>
				))}
			</MuiRadioGroup>
		</FormControl>
	);
};

export default RadioGroup;
