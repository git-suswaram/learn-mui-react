import React, { useEffect, useState } from 'react';
import {
	Paper,
	TableBody,
	TableCell,
	TableRow,
	Toolbar,
	InputAdornment,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Search } from '@mui/icons-material';
import useTable from '../components/Table/useTable';
import Controls from '../components/controls';
import { read } from '../api/api';

const useStyles = makeStyles((theme) => ({
	pageContent: {
		borderRadius: '15px',
		margin: `${theme.spacing(1)} 0px`,
		padding: theme.spacing(3),
	},
	searchInput: {
		width: '75%',
		marginBottom: '15px',
	},
}));

const SampleTable = () => {
	const classes = useStyles();
	const [departments, setDepartments] = useState([]);
	const [employees, setEmployees] = useState([]);
	const [filterFn, setFilterFn] = useState({
		fn: (items) => {
			return items;
		},
	});

	const handleTableSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (items) => {
				if (target.value === '') return items;
				else
					return items.filter((x) =>
						x.fullName.toLowerCase().includes(target.value)
					);
			},
		});
	};

	const columns = [
		{
			id: 'fullName',
			label: 'Employee Name',
		},
		{
			id: 'email',
			label: 'Email Address',
		},

		{
			id: 'city',
			label: 'City',
		},
		{
			id: 'department',
			label: 'Department',
			disableSorting: true,
		},
		{
			id: 'mobile',
			label: 'Mobile Number',
		},
	];
	const {
		TableContainer,
		TableHeader,
		TablePagination,
		recordsAfterPagingAndSorting,
	} = useTable(employees, columns, filterFn);

	useEffect(() => {
		const getAllEmployees = async () => {
			const allEmployees = await read('http://localhost:8000/employees');

			if (allEmployees) {
				setEmployees(allEmployees.data);
			}
		};
		getAllEmployees();

		const getAllDepartments = async () => {
			const departments = await read(`http://localhost:8000/departments`);

			if (departments) {
				setDepartments(departments.data);
			}
		};
		getAllDepartments();
	}, []);

	return (
		<React.Fragment>
			<Paper className={classes.pageContent}>
				<Toolbar>
					<Controls.Input
						className={classes.searchInput}
						label='Search Employees'
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Search />
								</InputAdornment>
							),
						}}
						onChange={handleTableSearch}
					/>
				</Toolbar>
				<TableContainer>
					<TableHeader />
					<TableBody>
						{recordsAfterPagingAndSorting().map((employee) => (
							<TableRow key={employee.id}>
								<TableCell>{employee.fullName}</TableCell>
								<TableCell>{employee.email}</TableCell>
								<TableCell>{employee.city}</TableCell>
								<TableCell>
									{departments &&
										Object.keys(departments).length > 0 &&
										departments.filter(
											(department) => department.id === employee.departmentId
										)[0].title}
								</TableCell>
								<TableCell>{employee.mobile}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</TableContainer>
				<TablePagination />
			</Paper>
		</React.Fragment>
	);
};

export default SampleTable;
