import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validations';

const router = express.Router();

//client will call  controller function through this route
router.get('/:studentId', StudentControllers.getSingleStudent)
router.patch('/:studentId', validateRequest(studentValidations.updateStudentValidationSchema), StudentControllers.updateStudent);
router.delete('/:studentId', StudentControllers.deleteSingleStudent);
router.get('/', StudentControllers.getAllStudents)

export const StudentRoutes = router;