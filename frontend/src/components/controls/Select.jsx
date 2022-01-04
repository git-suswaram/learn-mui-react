import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select as MuiSelect,
} from '@mui/material';
import React from 'react';

const Select = (props) => {
	const { name, label, value, onChange, options, error = null } = props;

	return (
		<FormControl variant='outlined' {...(error && { error: true })}>
			<InputLabel>{label}</InputLabel>
			<MuiSelect
				label={label}
				name={name}
				value={value}
				onChange={onChange}
				InputLabelProps={{
					shrink: true,
				}}
			>
				<MenuItem value=''>None</MenuItem>
				{options.map((item) => (
					<MenuItem key={item.id} value={item.id}>
						{item.title}
					</MenuItem>
				))}
			</MuiSelect>
			{error && <FormHelperText>{error}</FormHelperText>}
		</FormControl>
	);
};

export default Select;
