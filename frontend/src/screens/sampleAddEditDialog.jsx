import React, { useState } from 'react';
import { Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import SampleForm from './sampleForm';
import Controls from '../components/controls';

const AddNewPopup = () => {
	const [openPopup, setOpenPopup] = useState(false);
	return (
		<React.Fragment>
			<Stack direction='row' justifyContent='end'>
				<Controls.Button
					text='Add New'
					variant='outlined'
					startIcon={<AddIcon />}
					onClick={() => setOpenPopup(true)}
				/>
			</Stack>
			<Controls.Popup
				title='Employee Form'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<SampleForm />
			</Controls.Popup>
		</React.Fragment>
	);
};

export default AddNewPopup;
