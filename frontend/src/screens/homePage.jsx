import React from 'react';
import Search from '../components/Search/Search';
import ScreenName from '../controls/ScreenName';

const HomePage = () => {
	return (
		<React.Fragment>
			<ScreenName name='Accounts Listing' />
			<Search />
		</React.Fragment>
	);
};

export default HomePage;
