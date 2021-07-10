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
