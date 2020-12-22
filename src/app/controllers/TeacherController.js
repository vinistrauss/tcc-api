import { Op } from 'sequelize';
import * as Yup from 'yup';

import Class from '../models/Class';
import Teacher from '../models/Teacher';

import AppError from '../errors/AppError';

class TeacherController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            throw new AppError('request body is invalid');
        }

        const classes = await Class.findOne({
            where: { name: req.body.name },
        });

        if (classes) {
            throw new AppError('This teacher already exist');
        }

        const teachers = await Teacher.create(req.body);

        return res.json(teachers);
    }

    async index(req, res) {
        if (!req.query.name) {
            const teachers = await Teacher.findAll({ order: [['id', 'ASC']] });

            return res.json(teachers);
        }

        const teacher = await Teacher.findOne({
            where: {
                name: { [Op.startsWith]: req.query.name.toUpperCase() },
            },
        });

        return res.json(teacher);
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
