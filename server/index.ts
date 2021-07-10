/**
 * server/index.ts
 *
 * Entry point for the server-side
 *
 * Polar Survey
 * @author Aun Raza
 * @author Jamee Kim (301058465)
 * @author Jerome Ching
 * @author Sophie Xu
 * @author Tien Sang Nguyen
 * @author Eunju Jo
 */

import dotenv from "dotenv";
import runApp from "./config";
import { checkEnvVars } from "./config/env";

// Read in any `.env` files
dotenv.config();

// Make sure the app can be run by checking necessary environment variables
if (!checkEnvVars()) {
    console.error("Halting the process due to a critical error");
    process.exit(1); // the app must not proceed any furthur
}

// Run the application
runApp();
