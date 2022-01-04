import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Form, useForm } from '../components/Forms/useForm';
import Controls from '../components/controls';
import { read } from '../api/api';

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

	const { values, handleInputChange, errors, setErrors, resetForm } = useForm(
		initialFormState,
		true,
		validate
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) window.alert('Submit clicked');
	};

	return (
		<React.Fragment>
			<Form onSubmit={handleSubmit}>
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
						<div>
							<Controls.Button text='Submit' type='submit' />
							<Controls.Button
								text='Reset'
								color='inherit'
								onClick={resetForm}
							/>
						</div>
					</Grid>
				</Grid>
			</Form>
		</React.Fragment>
	);
};

export default SampleForm;
