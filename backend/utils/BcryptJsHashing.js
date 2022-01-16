import bcrypt from 'bcryptjs';

const hashText = async (password, rounds = 10) =>
	await bcrypt.hash(password, rounds);

export default hashText;
