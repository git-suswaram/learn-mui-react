import express from 'express';
import asyncHandler from 'express-async-handler';
import { encrypt, decrypt } from '../utils/CryptoEncryption.js';
import hash from '../utils/BcryptJsHashing.js';

const router = express.Router();

router.post('/hash', async (req, res) => {
	const body = req.body;
	const hashedData = body.data && (await hash(body.data));
	return res.send({ hash: hashedData });
});

router.post('/encrypt', (req, res) => {
	const body = req.body;
	const encryptedPassword = body.data && encrypt(body.data);
	return res.send({ encryptedData: encryptedPassword });
});

router.post('/decrypt', (req, res) => {
	const body = req.body;
	const decryptedPassword = body.data && decrypt(body.data);
	return res.send({ decryptedData: decryptedPassword });
});

export default router;
