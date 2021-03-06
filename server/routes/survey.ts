/**
 * server/routes/survey.ts
 *
 * Survey-related routers to be exported to server/routers/index
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

// import controllers
import * as surveyController from "../controllers/survey";
import * as responseController from "../controllers/response";
import * as util from "../util/index";

// GET for surveyavailable:
router.get("/surveyavailable", surveyController.displayAvailableSurvey);

// GET makesurvey page through displayMakeSurveyPage method
router.get("/makesurvey", util.authguard, surveyController.displayMakeSurveyPage);

// POST - process makesurvey
router.post("/makesurvey", util.authguard, surveyController.processMakeSurveyPage);

// NEW GET question page through displayQuestionPage method
router.get("/question/:id", surveyController.displayQuestionPage);

// POST Process question /question/:id page
router.post("/question/:id", responseController.processQuestion);

// GET question page through displayQuestionPage method
router.get("/editsurvey/:id", util.authguard, surveyController.displayEditSurveyPage);

// POST- Process /edit/:id page
router.post("/editsurvey/:id", util.authguard, surveyController.processEditSurveyPage);

// DELETE process to delete survey
router.get("/delete/:id", util.authguard, surveyController.processDeleteSurvey);

// DELETE process to delete result
router.get("/deleteres/:id", util.authguard, responseController.processDeleteResult);

// GET surveyresult Show the result of the survey
router.get("/surveyresponse/:id", util.authguard, responseController.displayResult);

//GET Download Page
router.get("/download/:id", util.authguard, responseController.downloadRaw);
