import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = mariadb.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	multipleStatements: true,
	dialect: 'mariadb',
	dialectOptions: {
		timezone: 'Etc/GMT',
	},
	dateStrings: ['DATE', 'DATETIME'],
});

dbConnection.on('connection', (conn) => {
	conn.query("SET time_zone='+00:00';", (error) => {
		if (error) {
			throw error;
		}
	});
});
export default dbConnection;
