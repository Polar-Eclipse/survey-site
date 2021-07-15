/**
 * server/config/env.ts
 *
 * Ensure all necessary environment variables are present
 *
 * Polar Survey
 * @author Aun Raza (301074590)
 * @author Jamee Kim (301058465)
 * @author Jerome Ching (300817930)
 * @author Sophie Xu (301098127)
 * @author Tien Sang Nguyen (301028223)
 * @author Eunju Jo (301170731)
 */

/**
 * The type of the env vars with the application's environment variables
 */
export interface AppEnvVars {
    DB_URI: string,
    SESSION_SECRET: string,
}

/**
 * An array of the names of the necessary environment variables
 */
const envVarNames: (keyof AppEnvVars)[] = ["DB_URI", "SESSION_SECRET"];

/**
 * A flag to keep track of if the environment variables are already checked
 */
let envChecked = false;

/**
 * Whether the needed environment variables are all in place; false if not checked yet
 */
let envEnsured = false;

/**
 * Check if the necessary environment variables are present and return the result
 *
 * @returns Whether all of the needed environment variables are present in the runtime
 */
export function checkEnvVars(): boolean {
    // no need to check
    if (envChecked) return envEnsured;

    const missingVars = [];

    for (const varName of envVarNames) {
        if (typeof process.env[varName] === "undefined") {
            missingVars.push(varName);
        }
    }

    if (missingVars.length > 0) {
        console.error(`Missing environment variables: ${missingVars.join(", ")}`);
    } else {
        envEnsured = true;
    }

    envChecked = true;
    return envEnsured;
}

/**
 * Get a type-safe object of the necessary environment variables
 *
 * @throws Error Some variables are not present
 */
export function ensuredEnv(): AppEnvVars {
    if (checkEnvVars()) return process.env as unknown as AppEnvVars;
    throw new Error("There are missing environment variables that are necessary for the app to work");
}
