import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import auth from '../../config/auth';

import AppError from '../errors/AppError';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            throw new AppError('request body is invalid');
        }

        const { email, password } = req.body;

        const userExist = await User.findOne({ where: { email } });

        if (!userExist) {
            throw new AppError('User does not find', 401);
        }

        if (!(await userExist.checkPassword(password))) {
            throw new AppError('Passsword does not match', 401);
        }

        const { id } = userExist;

        return res.json({
            user: { id, email },
            token: jwt.sign({ id }, auth.secret, {
                expiresIn: auth.expiresIn,
            }),
        });
    }
}

export default new SessionController();
