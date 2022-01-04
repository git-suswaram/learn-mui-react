import { Box } from '@mui/material';
import { useState } from 'react';
import useStyles from './FormStyles';

const useForm = (initialFormState, validateOnChange = false, validate) => {
	const [values, setValues] = useState(initialFormState);

	const [errors, setErrors] = useState(initialFormState);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});

		validateOnChange && validate({ [name]: value });
	};

	const resetForm = () => {
		setValues(initialFormState);
		setErrors({});
	};

	return {
		values,
		setValues,
		errors,
		setErrors,
		handleInputChange,
		resetForm,
	};
};

export default function Form(props) {
	const classes = useStyles();
	const { children, ...others } = props;

	return (
		<Box
			component='form'
			className={classes.root}
			autoComplete='off'
			{...others}
		>
			{children}
		</Box>
	);
}

export { Form, useForm };
