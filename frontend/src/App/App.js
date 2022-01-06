import React from 'react';
import { CssBaseline, Paper, Container } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import customTheme from '.././styles/customTheme';
import TopNavigationBar from '.././components/Navigation/TopNavigationBar';
import MyLearning from '../MyLearning';
import './App.css';

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

function App(props) {
	return (
		<React.Fragment>
			<CssBaseline />
			<ThemeProvider theme={customTheme}>
				<Paper sx={useStyles}>
					<Container maxWidth='lg'>
						<TopNavigationBar />
						<MyLearning>{props.children}</MyLearning>
					</Container>
				</Paper>
			</ThemeProvider>
		</React.Fragment>
	);
}

export default App;
