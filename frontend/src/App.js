import React from 'react';
import { CssBaseline, Paper, Container } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import customTheme from './styles/customTheme';
import './App.css';
import TopNavigationBar from './components/Navigation/TopNavigationBar';
import HomePage from './screens/homePage';

const useStyles = {
	minHeight: '100vh',
	overflow: 'hidden',
	paddingTop: '15px',
	backgroundColor: '#e9ecef',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center center',
	backgroundSize: 'fixed',
	backgroundAttachment: 'fixed',
};

function App() {
	return (
		<React.Fragment>
			<CssBaseline />
			<ThemeProvider theme={customTheme}>
				<Paper sx={useStyles}>
					<Container maxWidth='lg'>
						<TopNavigationBar />
						<HomePage />
					</Container>
				</Paper>
			</ThemeProvider>
		</React.Fragment>
	);
}

export default App;
