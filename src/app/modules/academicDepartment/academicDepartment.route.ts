import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";
import { AcademicDepartmentValidations } from "./academicDepartment.validation";

const router = Router();

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);

router.get('/:academicDepartmentId', AcademicDepartmentControllers.getSingleAcademicDepartment);

router.post('/create-academic-department', validateRequest(AcademicDepartmentValidations.createAcademicDepartmentValidationSchema), AcademicDepartmentControllers.createAcademicDepartment);

router.patch('/:academicDepartmentId', validateRequest(AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema), AcademicDepartmentControllers.updateAcademicDepartment);

export const AcademicDepartmentRoutes = router;