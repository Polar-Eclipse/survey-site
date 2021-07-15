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

//import function from survey controller
import {displayMakeSurveyPage, processMakeSurveyPage,displayAvailableSurvey, processDeleteAvailableSurvey} from "../Controllers/survey";

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

//old GET: GET surveyavailable directly in the root
/***
router.get("/surveyavailable", (req, res, _next) => {
    res.render("index", { title: "SurveyAvailable", page: "surveyavailable" });
});
***/

//new GET for surveyavailable:
router.get("/surveyavailable",displayAvailableSurvey);

// we will probably move this to another route
router.get("/account", (req, res, _next) => {
    res.render("index", { title: "Account", page: "account" });
});

//old GET: GET makesurvey page directly in the root
/****
router.get("/makesurvey", (req, res, _next) => {
    res.render("index", { title: "MakeSurvey", page: "makesurvey" });
});
****/

//NEW GET makesurvey page through displayMakeSurveyPage method
router.get("/makesurvey", displayMakeSurveyPage);

//POST - process makesurvey
router.post("/makesurvey", processMakeSurveyPage);

router.get("/question", (req, res, _next) => {
    res.render("index", { title: "Question", page: "question" });
});

router.get("/editsurvey", (req, res, _next) => {
    res.render("index", { title: "EditSurvay", page: "editsurvey" });
});

//DELETE process to delete survey
router.get("/delete/:id",processDeleteAvailableSurvey);

router.get("/edituser", (req, res, _next) => {
    res.render("index", { title: "EditUser", page: "edituser" });
});


