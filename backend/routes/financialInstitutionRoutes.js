import express from 'express';
import asyncHandler from 'express-async-handler';
import dbConnection from '../config/mariadb.js';
import validate from '../../backend/middlewares/validationHandler.js';
import {
	fiInsertUpdateSchema,
	fiDeleteSchema,
} from '../../backend/validations/fiValidationSchema.js';

const router = express.Router();

const selectQuery =
	'select isActive, count(*) row_count from financial_institution where institutionShortName = ?';

const insertQuery =
	'insert into financial_institution (institutionName, institutionShortName, branchName, branchCode, ifscCode, addressLine1, addressLine2, addressLine3, city, state, pincode, country, isActive) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

const updateQuery =
	'update financial_institution set institutionName=? , branchName=?, branchCode=?, ifscCode=?, addressLine1=?, addressLine2=?, addressLine3=?, city=?, state=?, pincode=?, country=?, isActive = ? where institutionShortName = ?';

const disableQuery =
	'update financial_institution set isActive = 0 where institutionShortName = ?';

// @desc Fetch all financial institutions
// @route GET /api/finance/fi
// @access Public
router.get(
	'/',
	asyncHandler(async (req, res) => {
		try {
			const query = 'select * from financial_institution';
			const rows = await dbConnection.query(query);
			res.send(rows);
		} catch (error) {
			res.status(500);
			throw error;
		}
	})
);

// @desc Fetch financial institutions by shortName
// @route GET /api/finance/fi/shortName/:shortName
// @access Public
router.get(
	'/shortName/:shortName',
	asyncHandler(async (req, res) => {
		try {
			const shortName = req.params.shortName;
			const query =
				'select * from financial_institution where institutionShortName = ?';
			const rows = await dbConnection.query(query, [shortName]);
			res.send(rows);
		} catch (error) {
			res.status(500);
			throw error;
		}
	})
);

// @desc Insert/Update financial institution
// @route POST /api/finance/fi
// @access Public
router.post(
	'/',
	validate(fiInsertUpdateSchema),
	asyncHandler(async (req, res) => {
		try {
			const fi = req.body;
			const isActive = fi.isActive == true ? 1 : 0;

			let query, parameters;

			const rows = await dbConnection.query(selectQuery, [
				fi.institutionShortName,
			]);

			if (rows[0].row_count == 0) {
				query = insertQuery;
				parameters = [
					fi.institutionName,
					fi.institutionShortName,
					fi.branchName,
					fi.branchCode,
					fi.ifscCode,
					fi.addressLine1,
					fi.addressLine2,
					fi.addressLine3,
					fi.city,
					fi.state,
					fi.pincode,
					fi.country,
					isActive,
				];
			} else if (fi.isActive == 1 && rows[0].row_count == 1) {
				query = updateQuery;
				parameters = [
					fi.institutionName,
					fi.branchName,
					fi.branchCode,
					fi.ifscCode,
					fi.addressLine1,
					fi.addressLine2,
					fi.addressLine3,
					fi.city,
					fi.state,
					fi.pincode,
					fi.country,
					isActive,
					fi.institutionShortName,
				];
			} else {
				res.status(400);
				throw new Error('Inactive account cannot be updated');
			}

			const result = await dbConnection.query(query, parameters);
			res.send(result);
		} catch (error) {
			res.status(500);
			throw error;
		}
	})
);

// @desc delete financial institution
// @route DELETE /api/finance/fi
// @access Public
router.delete(
	'/',
	validate(fiDeleteSchema),
	asyncHandler(async (req, res) => {
		try {
			const fi = req.body;

			const rows = await dbConnection.query(selectQuery, [
				fi.institutionShortName,
			]);

			if (rows[0].row_count == 1) {
				const result = await dbConnection.query(disableQuery, [
					fi.institutionShortName,
				]);
				res.send(result);
			} else {
				res.status(400);
				throw new Error('No matching data found to process delete.');
			}
		} catch (error) {
			res.status(500);
			throw error;
		}
	})
);

export default router;
