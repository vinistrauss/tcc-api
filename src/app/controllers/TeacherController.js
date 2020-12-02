import { Op } from 'sequelize';
import { format } from 'date-fns';
import * as Yup from 'yup';

import Class from '../models/Class';
import Teacher from '../models/Teacher';

import AppError from '../errors/AppError';

const { utcToZonedTime } = require('date-fns-tz');

class TeacherController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            classes_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            throw new AppError('request body is invalid');
        }

        const classes = await Class.findOne({
            where: { id: req.body.classes_id },
        });

        if (!classes) {
            throw new AppError('this classes does not found');
        }

        const teachers = await Teacher.create(req.body);

        return res.json(teachers);
    }

    async index(req, res) {
        if (!req.query.name) {
            const teacher = await Teacher.findAll({
                include: [
                    {
                        model: Class,
                        as: 'class',
                    },
                ],
            });

            return res.json(teacher);
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
        });

        if (!(await schema.isValid(req.query))) {
            throw new AppError('request query is invalid');
        }

        const date = new Date();
        const utcDate = utcToZonedTime(date, 'America/Sao_Paulo');
        let timeRequest = '';

        const hour = format(utcDate, 'HH:mm');

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
                name: { [Op.startsWith]: req.query.name.toUpperCase() },
            },
            include: [
                {
                    model: Class,
                    as: 'class',
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
            throw new AppError('this teacher does not found');
        }

        if (req.body.classes_id !== undefined) {
            const classes = await Class.findOne({
                where: { id: req.body.classes_id },
            });

            if (!classes) {
                throw new AppError('this classes does not found');
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
            throw new AppError('this teacher does not found');
        }

        await teachers.destroy();

        return res.json(teachers);
    }
}

export default new TeacherController();
