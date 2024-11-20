import { createUser, loginUser, getUserInfoById } from '../services/users.js';

import express from 'express';
export const userRouter = express.Router();

userRouter.post('/v1/user/signup', async (req, res) => {
	try {
		const user = await createUser(req.body);
		return res.status(201).json({ username: user.username });
	} catch (error) {
		return res.status(400).json({
			error: 'failed to create a user, does the username already exist?',
		});
	}
});

userRouter.post('/v1/user/login', async (req, res) => {
	try {
		const token = await loginUser(req.body);
		return res.status(200).send({ token });
	} catch (error) {
		return res.status(400).send({
			error: 'Login failed, did you enter the correct username/password?',
		});
	}
});

userRouter.get('/v1/users/:id', async (req, res) => {
	const userId = req.params.id;
	const userInfo = await getUserInfoById(userId);
	return res.status(200).send(userInfo);
});
