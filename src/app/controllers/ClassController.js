import * as Yup from 'yup';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { Op } from 'sequelize';

import Class from '../models/Class';
import Teacher from '../models/Teacher';

import AppError from '../errors/AppError';

class ClassController {
    async store(req, res) {
        const schema = Yup.object().shape({
            teacher_id: Yup.number().required(),
            name: Yup.string().required(),
            classroom: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            throw new AppError('this request body is invalid');
        }

        const teacher = await Teacher.findOne({
            where: { id: req.body.teacher_id },
        });

        if (!teacher) {
            throw new AppError('This teacher does not found');
        }

        const classes = await Class.create(req.body);

        return res.json(classes);
    }

    async index(req, res) {
        if (!req.query.name) {
            const classes = await Class.findAll({
                order: [['id', 'ASC']],
                include: [
                    {
                        model: Teacher,
                        as: 'teachers',
                    },
                ],
            });

            return res.json(classes);
        }

        const date = new Date();
        const utcDate = utcToZonedTime(date, 'America/Sao_Paulo');
        const hour = format(utcDate, 'HH:mm');

        let timeRequest = '';

        if (
            req.query.dayWeek !== undefined &&
            req.query.hour !== undefined &&
            req.query.minute !== undefined
        ) {
            timeRequest = new Date();
            timeRequest.setHours(req.query.hour);
            timeRequest.setMinutes(req.query.minute);
        }

        const classes = await Class.findOne({
            where: {
                day_week:
                    req.query.dayWeek !== undefined
                        ? req.query.dayWeek
                        : date.getDay(),
                end_hour: {
                    [Op.gte]:
                        timeRequest === ''
                            ? hour
                            : format(timeRequest, 'HH:mm'),
                },
            },
            include: [
                {
                    model: Teacher,
                    as: 'teachers',
                    where: {
                        name: { [Op.startsWith]: req.query.name.toUpperCase() },
                    },
                },
            ],
        });

        return res.json(classes);
    }

    async update(req, res) {
        const classes = await Class.findOne({
            where: { id: req.params.id },
        });

        if (!classes) {
            throw new AppError('This classes does not found');
        }

        await classes.update(req.body);

        return res.json(classes);
    }

    async delete(req, res) {
        const classes = await Class.findByPk(req.params.id);

        if (!classes) {
            throw new AppError('This classes does not exist');
        }

        await classes.destroy();

        return res.json(classes);
    }
}

export default new ClassController();
