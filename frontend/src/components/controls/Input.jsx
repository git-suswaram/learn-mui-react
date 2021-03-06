import { TextField } from '@mui/material';
import React from 'react';

const Input = (props) => {
	const { name, label, value, autoComplete, onChange, error, ...others } =
		props;

	return (
		<TextField
			variant='outlined'
			name={name}
			value={value}
			label={label}
			onChange={onChange}
			autoComplete={autoComplete || 'off'}
			InputLabelProps={{
				shrink: true,
			}}
			{...(error && { error: true, helperText: error })}
			{...others}
		/>
	);
};

export default Input;
