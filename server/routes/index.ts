/**
 * server/routes/index.ts
 *
 * Register the routers to the express app
 *
 * Polar Survey
 * @author Aun Raza
 * @author Jamee Kim (301058465)
 * @author Jerome Ching
 * @author Sophie Xu
 * @author Tien Sang Nguyen
 * @author Eunju Jo
 */

import { Express } from "express-serve-static-core";

import rootRouter from "./root";

/**
 * Register all routers to the express app
 */
export default function setRouters(app: Express): void {
    app.use("/", rootRouter);
}
