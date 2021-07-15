/**
 * server/index.ts
 *
 * Entry point for the server-side
 *
 * Polar Survey
 * @author Aun Raza (301074590)
 * @author Jamee Kim (301058465)
 * @author Jerome Ching (300817930)
 * @author Sophie Xu (301098127)
 * @author Tien Sang Nguyen (301028223)
 * @author Eunju Jo (301170731)
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
