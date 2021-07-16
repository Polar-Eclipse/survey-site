/**
 * server/config/app.ts
 *
 * Set up the express application
 *
 * Polar Survey
 * @author Aun Raza (301074590)
 * @author Jamee Kim (301058465)
 * @author Jerome Ching (300817930)
 * @author Sophie Xu (301098127)
 * @author Tien Sang Nguyen (301028223)
 * @author Eunju Jo (301170731)
 */

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { Express } from "express-serve-static-core";
import createError, { HttpError } from "http-errors";
import logger from "morgan";
import path from "path";
import setRouters from "../routes";

/**
 * Create the express server application
 */
export default function createApp(): Express {
    const app = express();

    // Make express use EJS to render the templates in the views folder
    app.set("views", path.join(process.cwd(), "server", "views"));
    app.set("view engine", "ejs");

    // Add globally used middlewares
    app.use(logger("dev")); // logger
    app.use(express.json()); // json body parser
    app.use(express.urlencoded({ extended: false })); // url encoded body parser
    app.use(cookieParser()); // browser cookie parser
    app.use(cors()); // CORS(cross-origin resource sharing) headers

    // Send static files in the given folders
    app.use(express.static(path.join(__dirname, "../../client")));
    app.use(express.static(path.join(__dirname, "../../node_modules")));

    // Set commonly-used variables in the templates
    app.use(setCommonVars);

    // Register routers
    setRouters(app);

    // Create 404 Not found error for any undefined routes
    app.use((req, res, next) => next(createError(404)));

    // Handle errors and render the error page
    app.use(errorHandler);

    return app;
}

/**
 * Middleware to set various commonly-used variables in the templates
 */
function setCommonVars(req: Request, res: Response, next: NextFunction): void {
    // DO NOT DELETE: These are used to prevent error in case no additional styles/scripts are specified
    res.locals.styles = [];
    res.locals.scripts = [];

    // Date formatter: helper method for converting a Date object to "YYYY-MM-DD" format
    // Use this for the value attribute of input nodes with type "date"
    res.locals.formatDate = (date?: Date): string => {
        return date
            ? new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
            : "";
    };

    // Date displayer: helper method that shows a user-friendly string representation of the given Date object
    // Use this when showing the date to the users
    const formatter = Intl.DateTimeFormat("en-CA");
    res.locals.displayDate = (date?: Date): string => {
        return date? formatter.format(date) : "";
    };

    // Invoke next handlers
    next();
}

/**
 * The safety net for errors from route handlers that renders the error page
 */
function errorHandler(err: HttpError, req: Request, res: Response, _next: NextFunction): void {
    // Show error on the page, only showing details when in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Send the response with the error page
    res.status(err.status || 500); // internal server error if the status is not set by the error
    res.render("error");
}
