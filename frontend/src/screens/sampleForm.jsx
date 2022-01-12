import React, { useEffect, useState } from 'react';
import { Grid, Paper, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Form, useForm } from '../components/Forms/useForm';
import Controls from '../components/controls';
import { add, read } from '../api/api';

const useStyles = makeStyles((theme) => ({
	pageContent: {
		borderRadius: '15px',
		margin: `${theme.spacing(1)} 0px`,
		padding: theme.spacing(3),
	},
}));

const genderItems = [
	{ id: 'male', title: 'Male' },
	{ id: 'female', title: 'Female' },
	{ id: 'other', title: 'Other' },
];

const initialFormState = {
	id: 0,
	fullName: '',
	email: '',
	mobile: '',
	city: '',
	gender: 'male',
	departmentId: '',
	hireDate: new Date(),
	isPermanent: false,
};

const SampleForm = () => {
	const classes = useStyles();

	const [departments, setDepartments] = useState([]);

	useEffect(() => {
		const getAllDepartments = async () => {
			const allDepartments = await read('http://localhost:8000/departments');

			if (allDepartments) {
				setDepartments(allDepartments.data);
			}
		};
		getAllDepartments();
	}, []);

	const validate = (fieldValues = values) => {
		let temp = { ...errors };
		if ('fullName' in fieldValues)
			temp.fullName = fieldValues.fullName ? '' : 'This field is required';
		if ('email' in fieldValues)
			temp.email = /$^|.+@.+.\.+/.test(fieldValues.email)
				? ''
				: 'Email is not valid';
		if ('mobile' in fieldValues)
			temp.mobile =
				fieldValues.mobile.length > 9 ? '' : 'Mobile number is invalid';
		if ('departmentId' in fieldValues)
			temp.departmentId =
				fieldValues.departmentId.length !== 0 ? '' : 'This field is required';

		setErrors({
			...temp,
		});

		if (fieldValues === values)
			return Object.values(temp).every((x) => x === '');
	};

	const insertEmployees = async (body, headers = null) => {
		const response = await add('http://localhost:8000/employees', body);
		if (response.status === 201) {
			setValues(initialFormState);
			window.alert('Employee is added successfully');
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		if (validate()) insertEmployees(values);
	};

	const { values, setValues, handleInputChange, errors, setErrors, resetForm } =
		useForm(initialFormState, true, validate);

	return (
		<React.Fragment>
			<Paper className={classes.pageContent}>
				<Form onSubmit={handleSubmit}>
					<Stack>
						<Grid container>
							<Grid item xs={6}>
								<Controls.Input
									label='Full Name'
									name='fullName'
									value={values.fullName}
									onChange={handleInputChange}
									error={errors.fullName}
								/>
								<Controls.Input
									label='Email'
									name='email'
									value={values.email}
									onChange={handleInputChange}
									error={errors.email}
								/>
								<Controls.Input
									label='Mobile'
									name='mobile'
									value={values.mobile}
									onChange={handleInputChange}
									error={errors.mobile}
								/>
								<Controls.Input
									label='City'
									name='city'
									value={values.city}
									onChange={handleInputChange}
									error={errors.city}
								/>
							</Grid>
							<Grid item xs={6}>
								<Controls.RadioGroup
									name='gender'
									label='Gender'
									value={values.gender}
									onChange={handleInputChange}
									items={genderItems}
								/>
								<Controls.Select
									name='departmentId'
									label='Department'
									value={values.departmentId}
									onChange={handleInputChange}
									options={departments}
									error={errors.departmentId}
								/>
								<Controls.DatePicker
									label='Hiring Date'
									name='hireDate'
									value={values.hireDate}
									onChange={handleInputChange}
								/>
								<Controls.Checkbox
									label='Permanent Employee'
									name='isPermanent'
									value={values.isPermanent}
									onChange={handleInputChange}
								/>
							</Grid>
						</Grid>
						<Stack direction='row' justifyContent='end'>
							<Controls.Button
								text='Reset'
								color='inherit'
								onClick={resetForm}
							/>
							<Controls.Button text='Submit' type='submit' />
						</Stack>
					</Stack>
				</Form>
			</Paper>
		</React.Fragment>
	);
};

export default SampleForm;
