import { Router } from 'express';

import ClassController from './app/controllers/ClassController';
import TeacherController from './app/controllers/TeacherController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import QuestionController from './app/controllers/QuestionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(['/users', '/classes', '/teachers', '/questions'], authMiddleware);

routes.put('/users', UserController.update);

routes.get('/classes', ClassController.index);
routes.post('/classes', ClassController.store);
routes.put('/classes/:id', ClassController.update);
routes.delete('/classes/:id', ClassController.delete);

routes.get('/teachers', TeacherController.index);
routes.post('/teachers', TeacherController.store);
routes.put('/teachers/:id', TeacherController.update);
routes.delete('/teachers/:id', TeacherController.delete);

routes.post('/questions', QuestionController.store);
routes.get('/questions/:number', QuestionController.index);
routes.put('/questions/:number', QuestionController.update);

export default routes;
