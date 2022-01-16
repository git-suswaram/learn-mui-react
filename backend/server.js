import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import colors from 'colors';
import financialInstitutionRoutes from './routes/financialInstitutionRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import encryptionRoutes from './routes/encryptionRoutes.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

app.get('/api', (req, res) => {
	res.send('API is running...');
});

app.use('/api/fi', financialInstitutionRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/encryption', encryptionRoutes);

app.use('/', notFound);
app.use(errorHandler);

const PORT = process.env.EXPRESS_SERVER_PORT || 5500;
app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);

process
	.on('unhandledRejection', (reason, p) => {
		console.error(reason, 'Unhandled Rejection at Promise', p);
	})
	.on('uncaughtException', (err) => {
		console.error(err, 'Uncaught Exception thrown');
		process.exit(1);
	})
	.on('SIGINT', (err) => {
		console.log('SIGINT received...');
		server.close();
	})
	.on('SIGTERM', (err) => {
		console.log('SIGTERM received...');
		server.close();
	});
