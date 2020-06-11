import * as Yup from 'yup';

import User from '../models/User';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string()
                .required()
                .min(5),
        });

        console.log(req.body);

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'request body is invalid' });
        }

        const userExist = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExist) {
            return res.status(400).json({ error: 'user already exists' });
        }

        const user = await User.create(req.body);

        return res.json(user);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string(),
            oldPassword: Yup.string().min(5),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'request body is invalid' });
        }

        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if (email && email !== user.email) {
            const userExist = await User.findOne({
                where: { email },
            });

            if (userExist) {
                return res.status(400).json({ error: 'user already exists' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        await user.update(req.body);

        return res.json(user);
    }
}

export default new UserController();
