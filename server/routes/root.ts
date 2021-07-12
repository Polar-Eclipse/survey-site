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
