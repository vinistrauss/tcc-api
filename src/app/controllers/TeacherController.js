import { Op } from 'sequelize';
import { format } from 'date-fns';
import * as Yup from 'yup';

import Class from '../models/Class';
import Teacher from '../models/Teacher';

class TeacherController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            classes_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'request body is invalid' });
        }

        const classes = await Class.findOne({
            where: { id: req.body.classes_id },
        });

        if (!classes) {
            return res
                .status(400)
                .json({ error: 'this classes does not found' });
        }

        const teachers = await Teacher.create(req.body);

        return res.json(teachers);
    }

    async index(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
        });

        if (!(await schema.isValid(req.query))) {
            return res.status(400).json({ error: 'request query is invalid' });
        }

        const date = new Date();
        let timeRequest = '';

        const hour = format(date, 'HH:mm');

        if (
            req.query.dayWeek !== undefined &&
            req.query.hour !== undefined &&
            req.query.minute !== undefined
        ) {
            timeRequest = new Date();
            timeRequest.setHours(req.query.hour);
            timeRequest.setMinutes(req.query.minute);
        }

        const teachers = await Teacher.findOne({
            where: {
                name: req.query.name,
            },
            include: [
                {
                    model: Class,
                    as: 'class',
                    where: {
                        day_week: req.query.dayWeek
                            ? req.query.dayWeek
                            : date.getDay(),
                        start_hour: {
                            [Op.gte]:
                                timeRequest !== ''
                                    ? format(timeRequest, 'HH:mm')
                                    : hour,
                        },
                    },
                },
            ],
        });

        return res.json(teachers);
    }

    async update(req, res) {
        const teachers = await Teacher.findOne({
            where: { id: req.params.id },
        });

        if (!teachers) {
            return res
                .status(400)
                .json({ error: 'this teacher does not found' });
        }

        if (req.body.classes_id !== undefined) {
            const classes = await Class.findOne({
                where: { id: req.body.classes_id },
            });

            if (!classes) {
                return res
                    .status(400)
                    .json({ error: 'this classes does not found' });
            }
        }

        await teachers.update(req.body);

        return res.json(teachers);
    }

    async delete(req, res) {
        const teachers = await Teacher.findOne({
            where: { id: req.params.id },
        });

        if (!teachers) {
            return res
                .status(400)
                .json({ error: 'this teacher does not found' });
        }

        await teachers.destroy();

        return res.json(teachers);
    }
}

export default new TeacherController();
