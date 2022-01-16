import express from 'express';
import asyncHandler from 'express-async-handler';
import dbConnection from '../config/mariadb.js';

const router = express.Router();

const selectAccountsByAccountNoAndFiShortnameQuery =
	'select * from accounts where accountNumber = ? and institutionShortName = ?';

const insertAccountQuery =
	'insert into accounts (accountType, accountNumber, institutionShortName. primaryAccountHolderCIF, secondaryAccountHolderCIF, isJointAccount, accountOpenDate, accountCloseDate, benefeciaries, currentBalance, availableBalance, isActive) values (?, ?, ?, ?, ?, ?, ?, ?, ?json_compact(?), ?, ?, ?)';

const insertAccountHolderQuery =
	'insert into account_holders (cifId, institutionShortName, title, firstName, middleName, lastName, displayName, dateOfBirth, primaryAddress, mailingAddress, primaryTelephone, alternateTelephone, registeredEmail, isActive) values (?, ?, ?, ?, ?, ?, ?, ?, json_compact(?), json_compact(?), ?, ?, ?, ?)';

// const selectAccountQuery =
// 	"select acct.accountType, acct.accountNumber, acct.institutionShortName, acct.isJointAccount, acct.accountOpenDate, acct.createdDate, acct.accountCloseDate, acct.beneficiaries, acct.currentBalance, acct.availableBalance, acct.isActive, JSON_OBJECT('termStartDate', acctProfl.termStartDate, 'termEndDate', acctProfl.termEndDate, 'investmentAmount', acctProfl.investmentAmount, 'maturityValue', acctProfl.maturityValue, 'interestRate', acctProfl.interestRate, 'depositFrequency', acctProfl.depositFrequency, 'interestPayoutFrequency', acctProfl.interestPayoutFrequency, 'renewalDate', acctProfl.renewalDate, 'renewalType', acctProfl.renewalType, 'isActive', acctProfl.isActive) as accountProfile, JSON_QUERY(JSON_ARRAYAGG(JSON_OBJECT('isPrimary', acctHldrs.isPrimary, 'cifId', acctHldrs.cifId, 'title', acctHldrs.title, 'firstName', acctHldrs.firstName, 'lastName', acctHldrs.lastName, 'displayName', acctHldrs.displayName, 'dateOfBirth', acctHldrs.dateOfBirth, 'isActive', acctHldrs.isActive, 'deactivationDate', acctHldrs.deactivationDate, 'primaryAddress', acctHldrs.primaryAddress, 'mailingAddress', acctHldrs.mailingAddress, 'primaryTelephone', acctHldrs.primaryTelephone , 'alternateTelephone', acctHldrs.alternateTelephone , 'registeredEmail', acctHldrs.registeredEmail )), '$') as accountHolders from accounts acct, account_holders acctHldrs, account_profile acctProfl where acct.accountNumber = acctHldrs.accountNumber and acct.institutionShortName = acctHldrs.institutionShortName and acct.accountNumber = acctProfl.accountNumber and acct.institutionShortName = acctProfl.institutionShortName and acctHldrs.isActive = 1 and acctProfl.isActive = 1 and acct.accountNumber = ? and acct.institutionShortName = ? GROUP BY acct.accountNumber, acct.institutionShortName";

const selectAccountQuery =
	"select acct.accountType, acct.accountNumber, acct.institutionShortName, acct.isJointAccount, acct.accountOpenDate, acct.accountCloseDate, acct.beneficiaries, acct.currentBalance, acct.availableBalance, acct.isActive, JSON_OBJECT('termStartDate', acctProfl.termStartDate, 'termEndDate', acctProfl.termEndDate, 'investmentAmount', acctProfl.investmentAmount, 'maturityValue', acctProfl.maturityValue, 'interestRate', acctProfl.interestRate, 'depositFrequency', acctProfl.depositFrequency, 'interestPayoutFrequency', acctProfl.interestPayoutFrequency, 'renewalDate', acctProfl.renewalDate, 'renewalType', acctProfl.renewalType, 'isActive', acctProfl.isActive) as accountProfile, JSON_OBJECT('cifId', acctHldrs.cifId, 'title', acctHldrs.title, 'firstName', acctHldrs.firstName, 'lastName', acctHldrs.lastName, 'displayName', acctHldrs.displayName, 'dateOfBirth', acctHldrs.dateOfBirth, 'isActive', acctHldrs.isActive, 'deactivationDate', acctHldrs.deactivationDate, 'primaryAddress', acctHldrs.primaryAddress, 'mailingAddress', acctHldrs.mailingAddress, 'primaryTelephone', acctHldrs.primaryTelephone , 'alternateTelephone', acctHldrs.alternateTelephone , 'registeredEmail', acctHldrs.registeredEmail ) as primaryAccountHolder, case when acctHldrs2.firstName is null then null else JSON_OBJECT('cifId', acctHldrs2.cifId, 'title', acctHldrs2.title, 'firstName', acctHldrs2.firstName, 'lastName', acctHldrs2.lastName, 'displayName', acctHldrs2.displayName, 'dateOfBirth', acctHldrs2.dateOfBirth, 'isActive', acctHldrs2.isActive, 'deactivationDate', acctHldrs2.deactivationDate, 'primaryAddress', acctHldrs2.primaryAddress, 'mailingAddress', acctHldrs2.mailingAddress, 'primaryTelephone', acctHldrs2.primaryTelephone , 'alternateTelephone', acctHldrs2.alternateTelephone , 'registeredEmail', acctHldrs2.registeredEmail ) end as secondaryAccountHolder from accounts acct left join account_holders acctHldrs on acct.primaryAccountHolderCIF = acctHldrs.cifId and acct.institutionShortName = acctHldrs.institutionShortName left join account_holders acctHldrs2 on acct.secondaryAccountHolderCIF = acctHldrs2.cifId and acct.institutionShortName = acctHldrs2.institutionShortName left join account_profile acctProfl on acct.accountNumber = acctProfl.accountNumber and acct.institutionShortName = acctProfl.institutionShortName where acctProfl.isActive = 1 and acctHldrs.isActive = 1 and acct.accountNumber = ? and acct.institutionShortName = ?";

const selectAllAccountsQuery =
	"select acct.accountType, acct.accountNumber, acct.institutionShortName, acct.isJointAccount, acct.accountOpenDate, acct.accountCloseDate, acct.beneficiaries, acct.currentBalance, acct.availableBalance, acct.isActive, JSON_OBJECT('termStartDate', acctProfl.termStartDate, 'termEndDate', acctProfl.termEndDate, 'investmentAmount', acctProfl.investmentAmount, 'maturityValue', acctProfl.maturityValue, 'interestRate', acctProfl.interestRate, 'depositFrequency', acctProfl.depositFrequency, 'interestPayoutFrequency', acctProfl.interestPayoutFrequency, 'renewalDate', acctProfl.renewalDate, 'renewalType', acctProfl.renewalType, 'isActive', acctProfl.isActive) as accountProfile, JSON_OBJECT('cifId', acctHldrs.cifId, 'title', acctHldrs.title, 'firstName', acctHldrs.firstName, 'lastName', acctHldrs.lastName, 'displayName', acctHldrs.displayName, 'dateOfBirth', acctHldrs.dateOfBirth, 'isActive', acctHldrs.isActive, 'deactivationDate', acctHldrs.deactivationDate, 'primaryAddress', acctHldrs.primaryAddress, 'mailingAddress', acctHldrs.mailingAddress, 'primaryTelephone', acctHldrs.primaryTelephone , 'alternateTelephone', acctHldrs.alternateTelephone , 'registeredEmail', acctHldrs.registeredEmail ) as primaryAccountHolder, JSON_OBJECT('cifId', acctHldrs2.cifId, 'title', acctHldrs2.title, 'firstName', acctHldrs2.firstName, 'lastName', acctHldrs2.lastName, 'displayName', acctHldrs2.displayName, 'dateOfBirth', acctHldrs2.dateOfBirth, 'isActive', acctHldrs2.isActive, 'deactivationDate', acctHldrs2.deactivationDate, 'primaryAddress', acctHldrs2.primaryAddress, 'mailingAddress', acctHldrs2.mailingAddress, 'primaryTelephone', acctHldrs2.primaryTelephone , 'alternateTelephone', acctHldrs2.alternateTelephone , 'registeredEmail', acctHldrs2.registeredEmail ) as secondaryAccountHolder from accounts acct left join account_holders acctHldrs on acct.primaryAccountHolderCIF = acctHldrs.cifId and acct.institutionShortName = acctHldrs.institutionShortName left join account_holders acctHldrs2 on acct.secondaryAccountHolderCIF = acctHldrs2.cifId and acct.institutionShortName = acctHldrs2.institutionShortName left join account_profile acctProfl on acct.accountNumber = acctProfl.accountNumber and acct.institutionShortName = acctProfl.institutionShortName and acctProfl.isActive = 1 where acctHldrs.isActive = 1";

router.get(
	'/read',
	asyncHandler(async (req, res) => {
		const acct = req.body;

		const accounts = await dbConnection.query(selectAllAccountsQuery);
		const check = JSON.parse(JSON.stringify(accounts), (key, value) =>
			value === null || value === '' || JSON.stringify(value) === '{}'
				? undefined
				: value
		);
		// res.send(resultSelectAccountQuery[0]);
		res.send(check);
	})
);

router.post(
	'/read',
	asyncHandler(async (req, res) => {
		const acct = req.body;

		const resultSelectAccountQuery = await dbConnection.query(
			selectAccountQuery,
			[acct.accountNumber, acct.institutionShortName]
		);
		const check = JSON.parse(
			JSON.stringify(resultSelectAccountQuery[0]),
			(key, value) =>
				value === null || value === '' || JSON.stringify(value) === '{}'
					? undefined
					: value
		);
		// res.send(resultSelectAccountQuery[0]);
		res.send(check);
	})
);

router.post(
	'/create',
	asyncHandler(async (req, res) => {
		const acct = req.body;
		const acctHolder1 = acct.primaryAccountHolder;
		const acctHolder2 = acct.secondaryAccountHolder;

		const rowsFromSelect = await dbConnection.query(
			selectAccountsByAccountNoAndFiShortnameQuery,
			[acct.accountNumber, acct.institutionShortName]
		);

		const acctHolderQueryParams = (acctHolder) => {
			return [
				acctHolder.cifId,
				acctHolder.institutionShortName,
				acctHolder.title,
				acctHolder.firstName,
				acctHolder.middleName,
				acctHolder.lastName,
				acctHolder.displayName,
				acctHolder.dateOfBirth,
				acctHolder.isActive,
				acctHolder.primaryAddress,
				acctHolder.isMailingAddressSameAsPrimaryAddress
					? acctHolder.primaryAddress
					: acctHolder.mailingAddress,
				acctHolder.primaryTelephone,
				acctHolder.alternateTelephone,
				acctHolder.registeredEmail,
			];
		};
		if (rowsFromSelect.length != 0) {
			const resultAcctHolder1Insert = await dbConnection.query(
				insertAccountHolderQuery,
				acctHolderQueryParams(acctHolder1)
			);

			if (acct.isJointAccount && acctHolder2) {
				const resultAcctHolder2Insert = await dbConnection.query(
					insertAccountHolderQuery,
					acctHolderQueryParams(acctHolder2)
				);
			}

			const resultAcctInsert = await dbConnection.query(insertAccountQuery, [
				acct.accountType,
				acct.accountNumber,
				acct.institutionShortName,
				acctHolder1.cifId,
				acctHolder2.cifId,
				acct.isJointAccount,
				acct.accountOpenDate,
				null,
				acct.beneficiaries,
				acct.currentBalance,
				acct.availableBalance,
				acct.isActive,
			]);

			res.send(accountInsertResult);
		} else {
			res.send(rowsFromSelect);
		}
	})
);

export default router;
