/**
 * server/routes/root.ts
 *
 * Router for root-level routes
 *
 * Polar Survey
 * @author Aun Raza (301074590)
 * @author Jamee Kim (301058465)
 * @author Jerome Ching (300817930)
 * @author Sophie Xu (3010981127)
 * @author Tien Sang Nguyen (301028223)
 * @author Eunju Jo (301170731)
 */

import { Router } from "express";

const router = Router();
export default router;

// import controllers
import * as surveyController from "../controllers/survey";
import * as userController from "../controllers/user";

// GET "/" - home page
router.get("/", (req, res, _next) => {
    res.render("index", { title: "", page: "home" });
});

router.get("/login", (req, res, _next) => {
    res.render("index", { title: "Login", page: "login" });
});

router.get("/register", (req, res, _next) => {
    res.render("index", { title: "Register", page: "register" });
});

/****old GET: GET surveyavailable directly in the root****/
/****
router.get("/surveyavailable", (req, res, _next) => {
    res.render("index", { title: "SurveyAvailable", page: "surveyavailable" });
});
****/

//new GET for surveyavailable:
router.get("/surveyavailable", surveyController.displayAvailableSurvey);

// we will probably move this to another route
/****old GET: GET account page directly in the root****/
/****
router.get("/account", (req, res, _next) => {
    res.render("index", { title: "Account", page: "account" });
});
****/

//NEW GET account page through displaydisplayAccountPage method
router.get("/account", userController.displayAccountPage);

/****old GET: GET makesurvey page directly in the root****/
/****
router.get("/makesurvey", (req, res, _next) => {
    res.render("index", { title: "MakeSurvey", page: "makesurvey" });
});
****/

//NEW GET makesurvey page through displayMakeSurveyPage method
router.get("/makesurvey", surveyController.displayMakeSurveyPage);

//POST - process makesurvey
router.post("/makesurvey", surveyController.processMakeSurveyPage);

/****old GET: GET question page directly in the root****/
/****
router.get("/question", (req, res, _next) => {
    res.render("index", { title: "Question", page: "question" });
});
****/

//NEW GET question page through displayQuestionPage method
router.get("/question/:id", surveyController.displayQuestionPage);

/****old GET: GET edit survey page directly in the root****/
/****
router.get("/editsurvey", (req, res, _next) => {
    res.render("index", { title: "EditSurvey", page: "editsurvey" });
});
****/

//NEW GET question page through displayQuestionPage method
router.get("/editsurvey/:id", surveyController.displayEditSurveyPage);

//POST- Process /edit/:id page
router.post("/editsurvey/:id", surveyController.processEditSurveyPage);

//DELETE process to delete survey
router.get("/delete/:id", surveyController.processDeleteSurvey);

router.get("/edituser", (req, res, _next) => {
    res.render("index", { title: "EditUser", page: "edituser" });
});
