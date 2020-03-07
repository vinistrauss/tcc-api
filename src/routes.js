import { Router } from 'express';

import ClassController from './app/controllers/ClassController';
import TeacherController from './app/controllers/TeacherController';

const routes = new Router();

routes.get('/classes', ClassController.index);
routes.post('/classes', ClassController.store);
routes.put('/classes/:id', ClassController.update);
routes.delete('/classes/:id', ClassController.delete);

routes.get('/teachers', TeacherController.index);
routes.post('/teachers', TeacherController.store);
routes.put('/teachers/:id', TeacherController.update);
routes.delete('/teachers/:id', TeacherController.delete);

export default routes;
