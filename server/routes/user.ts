/**
 * server/routes/user
 *
 * User-Related Router to be exported to server/routers/index
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
import * as userController from "../controllers/user";

router.get("/login", (req, res, _next) => {
    res.render("index", { title: "Login", page: "login" });
});

router.get("/register", (req, res, _next) => {
    res.render("index", { title: "Register", page: "register" });
});

//NEW GET account page through displaydisplayAccountPage method
router.get("/account", userController.displayAccountPage);

router.get("/edituser", (req, res, _next) => {
    res.render("index", { title: "EditUser", page: "edituser" });
});
