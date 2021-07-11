/**
 * server/routes/root.ts
 *
 * Router for root-level routes
 *
 * Polar Survey
 * @author Aun Raza
 * @author Jamee Kim (301058465)
 * @author Jerome Ching
 * @author Sophie Xu
 * @author Tien Sang Nguyen
 * @author Eunju Jo
 */

import { Router } from "express";

const router = Router();
export default router;

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

// we will probably move this to another route lalla
router.get("/account", (req, res, _next) => {
    res.render("index", { title: "Account", page: "account" });
});

router.get("/makeSurvey", (req, res, _next) => {
    res.render("index", { title: "MakeSurvey", page: "makeSurvey" });
});

router.get("/question", (req, res, _next) => {
    res.render("index", { title: "Question", page: "question" });
});

