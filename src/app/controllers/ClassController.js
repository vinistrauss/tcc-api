import * as Yup from 'yup';

import Class from '../models/Class';

class ClassController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            classroom: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'this request body is invalid' });
        }

        const classes = await Class.create(req.body);

        return res.json(classes);
    }

    async index(req, res) {
        const classes = await Class.findAll();

        return res.json(classes);
    }

    async update(req, res) {
        const classes = await Class.findOne({
            where: { id: req.params.id },
        });

        if (!classes) {
            return res
                .status(400)
                .json({ error: 'this classes does not found' });
        }

        await classes.update(req.body);

        return res.json(classes);
    }

    async delete(req, res) {
        const classes = await Class.findByPk(req.params.id);

        if (!classes) {
            return res
                .status(400)
                .json({ error: 'this classes does not exist' });
        }

        await classes.destroy();

        return res.json(classes);
    }
}

export default new ClassController();
