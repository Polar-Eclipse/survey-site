/**
 * server/routes/user.ts
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
import * as util from "../util/index";

/* Get - display login page - with /login */
router.get("/login", userController.displayLoginPage);

/* POST - process login page when user clicks Login */
router.post("/login", userController.processLoginPage);

/* Get - display register page - with /register */
router.get("/register", userController.displayRegisterPage);

/* POST - process register page when user clicks Login */
router.post("/register", userController.processRegisterPage);

/* GET - GET logout page when user clicks Logout */
router.get("/logout", userController.processLogoutPage);

//NEW GET account page through displaydisplayAccountPage method
router.get("/account", util.authguard ,userController.displayAccountPage);

/* Get - display ediuser page - with /edituser */
router.get("/edituser/:id", util.authguard ,userController.displayUserEditPage);

router.post("/edituser/:id", util.authguard ,userController.processEditPage);
