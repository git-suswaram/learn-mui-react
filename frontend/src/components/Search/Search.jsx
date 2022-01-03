import React from 'react';
import { Box, Grid, InputBase } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import useStyles from './SearchStyles';

const Search = () => {
	const searchStyles = useStyles();
	return (
		<Box sx={{ ml: 0.5 }}>
			<Grid container rowSpacing={2} marginTop={'5px'}>
				<InputBase
					className={searchStyles.searchInput}
					placeholder='Search'
					inputProps={{ className: searchStyles.inputField }}
					startAdornment={<SearchIcon />}
				/>
			</Grid>
		</Box>
	);
};

export default Search;
