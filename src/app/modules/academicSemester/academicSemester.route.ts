import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidations } from "./academicSemester.validation";
import { AcademicSemesterControllers } from "./academicSemester.controller";

const router = Router()

router.get('/', AcademicSemesterControllers.getAllAcademicSemester);

router.get('/:semesterId', AcademicSemesterControllers.getSingleAcademicSemester);

router.post('/create-academic-semester', validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester);

router.patch('/:semesterId', AcademicSemesterControllers.updateSingleAcademicSemester)


export const AcademicSemesterRoutes = router;