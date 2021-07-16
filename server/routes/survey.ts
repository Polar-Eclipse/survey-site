/**
 * server/routes/survey
 *
 * Survey-Related Routers to be exported to server/routers/index
 *
 * Polar Survey
 * @author Aun Raza (301074590)
 * @author Jamee Kim (301058465)
 * @author Jerome Ching (300817930)
 * @author Sophie Xu (301098127)
 * @author Tien Sang Nguyen (301028223)
 * @author Eunju Jo (301170731)
 */

import { Router } from "express";
const router = Router();
export default router;

// import controller
import * as surveyController from "../controllers/survey";

//new GET for surveyavailable:
router.get("/surveyavailable", surveyController.displayAvailableSurvey);

//NEW GET makesurvey page through displayMakeSurveyPage method
router.get("/makesurvey", surveyController.displayMakeSurveyPage);

//POST - process makesurvey
router.post("/makesurvey", surveyController.processMakeSurveyPage);

//NEW GET question page through displayQuestionPage method
router.get("/question/:id", surveyController.displayQuestionPage);

//NEW GET question page through displayQuestionPage method
router.get("/editsurvey/:id", surveyController.displayEditSurveyPage);

//POST- Process /edit/:id page
router.post("/editsurvey/:id", surveyController.processEditSurveyPage);

//DELETE process to delete survey
router.get("/delete/:id", surveyController.processDeleteSurvey);
