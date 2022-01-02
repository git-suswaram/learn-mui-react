import asyncHandler from 'express-async-handler';

const validate = (schema, abortEarly = false) => {
	return asyncHandler(async (req, res, next) => {
		try {
			const validatedBody = await schema.validateAsync(req.body, {
				abortEarly: abortEarly,
			});
			req.body = validatedBody;
			next();
		} catch (error) {
			res.status(422);
			next(error);
		}
	});
};

export default validate;
