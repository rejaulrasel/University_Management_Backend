import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidations } from "./academicFaculty.validation";
import { AcademicFacultyControllers } from "./academicFaculty.controller";

const router = Router();

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);

router.get('/:academicFacultyId', AcademicFacultyControllers.getSingleAcademicFaculty);

router.post('/create-academic-faculty', validateRequest(AcademicFacultyValidations.createAcademicFacultyValidationSchema), AcademicFacultyControllers.createAcademicFaculty);

router.patch('/:academicFacultyId', validateRequest(AcademicFacultyValidations.updateAcademicFacultyValidationSchema), AcademicFacultyControllers.updateAcademicFaculty);

export const AcademicFacultyRoutes = router;