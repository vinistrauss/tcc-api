import * as Yup from 'yup';

import Question from '../schemas/Question';

import AppError from '../errors/AppError';

class QuestionController {
    async store(req, res) {
        const { course, number, question, answer } = req.body;

        const schema = Yup.object().shape({
            course: Yup.string().required(),
            number: Yup.number().required(),
            question: Yup.string().required(),
            answer: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            throw new AppError('request body is invalid');
        }

        await Question.create({
            course,
            number,
            question,
            answer,
        });

        return res.status(204).json();
    }

    async index(req, res) {
        const { number } = req.params;

        const questions = await Question.findOne({
            number,
        });

        if (!questions) {
            throw new AppError('Question not found');
        }

        return res.json(questions);
    }

    async update(req, res) {
        const { number } = req.params;

        const questions = await Question.findOne({
            number,
        });

        if (!questions) {
            throw new AppError('Question not found');
        }

        await questions.updateOne(req.body);

        return res.status(204).json();
    }
}

export default new QuestionController();
