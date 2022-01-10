import {
	Paper,
	Table,
	TableCell,
	TableHead,
	TableRow,
	TableContainer as MuiTableContainer,
	TablePagination as MuiTablePagination,
	TableSortLabel,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
	table: {
		// marginTop: theme.spacing(3),
		'& thead th': {
			fontWeight: '600',
			color: theme.palette.primary.main,
			backgroundColor: theme.palette.primary.light,
		},
		'& tbody td': {
			fontWeight: '300',
		},
		'& tbody tr:hover': {
			backgroundColor: '#fffbf2',
			cursor: 'pointer',
		},
	},
}));

const useTable = (rows, columns, filterFn) => {
	const classes = useStyles();

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const onRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const stableSort = (array, comparator) => {
		const stabilizedThis = array.map((element, index) => [element, index]);
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0]);
			if (order !== 0) return order;
			return a[1] - b[1];
		});
		return stabilizedThis.map((elements) => elements[0]);
	};

	const getComparator = (direction, column) => {
		return direction === 'desc'
			? (a, b) => descendingComparator(a, b, column)
			: (a, b) => -descendingComparator(a, b, column);
	};

	const descendingComparator = (a, b, column) => {
		if (b[column] < a[column]) {
			return -1;
		}
		if (b[column] > a[column]) {
			return 1;
		}
		return 0;
	};

	const recordsAfterPagingAndSorting = () => {
		return stableSort(
			filterFn.fn(rows),
			getComparator(sortDirection, sortedColumn)
		).slice(rowsPerPage * page, rowsPerPage * (page + 1));
	};

	const rowsPerPageOptions = [5, 10, 25, 100];
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[page]);
	const [sortDirection, setSortDirection] = useState();
	const [sortedColumn, setSortedColumn] = useState();

	const TableContainer = (props) => (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<MuiTableContainer sx={{ maxHeight: 640 }}>
				<Table stickyHeader aria-label='sticky table' className={classes.table}>
					{props.children}
				</Table>
			</MuiTableContainer>
		</Paper>
	);
	const TableHeader = (props) => {
		const handleSortRequest = (columnId) => {
			const isAsc = sortedColumn === columnId && sortDirection === 'asc';
			setSortedColumn(columnId);
			setSortDirection(isAsc ? 'desc' : 'asc');
		};

		return (
			<TableHead>
				<TableRow>
					{columns.map((column) => (
						<TableCell
							key={column.id}
							sortDirection={sortedColumn === column.id ? sortDirection : false}
						>
							{column.disableSorting ? (
								column.label
							) : (
								<TableSortLabel
									active={sortedColumn === column.id}
									direction={sortedColumn === column.id ? sortDirection : 'asc'}
									onClick={() => {
										handleSortRequest(column.id);
									}}
								>
									{column.label}
								</TableSortLabel>
							)}
						</TableCell>
					))}
				</TableRow>
			</TableHead>
		);
	};

	const TablePagination = () => (
		<MuiTablePagination
			component='div'
			rowsPerPageOptions={rowsPerPageOptions}
			rowsPerPage={rowsPerPage}
			page={page}
			count={rows.length}
			onPageChange={handlePageChange}
			onRowsPerPageChange={onRowsPerPageChange}
			showFirstButton={true}
			showLastButton={true}
		/>
	);

	return {
		TableContainer,
		TableHeader,
		TablePagination,
		recordsAfterPagingAndSorting,
	};
};

export default useTable;
