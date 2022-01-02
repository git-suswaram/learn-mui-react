import React from 'react';
import { CssBaseline, Paper, Container } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import customTheme from './styles/customTheme';
import './App.css';
import TopNavigationBar from './components/Navigation/TopNavigationBar';

const useStyles = {
	height: '100vh',
	backgroundColor: '#e9ecef',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center center',
	backgroundSize: 'cover',
	backgroundAttachment: 'fixed',
};

function App() {
	return (
		<React.Fragment>
			<ThemeProvider theme={customTheme}>
				<CssBaseline />
				<Paper style={useStyles}>
					<Container maxWidth='lg'>
						<TopNavigationBar />
					</Container>
				</Paper>
			</ThemeProvider>
		</React.Fragment>
	);
}

export default App;
