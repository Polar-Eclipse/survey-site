/**
 * server/controllers/user.ts
 *
 * Controllers for user-related pages and database operations
 *
 * Polar Survey
 * @author Aun Raza (301074590)
 * @author Jamee Kim (301058465)
 * @author Jerome Ching (300817930)
 * @author Sophie Xu (301098127)
 * @author Tien Sang Nguyen (301028223)
 * @author Eunju Jo (301170731)
 */

import { Request, Response, NextFunction } from "express";
import passport from "passport";

import Survey from "../models/survey";
import User from "../models/user";

/*** DISPLAY FUNCTIONS ***/

/**
 * Display the account page for the user
 */
export function displayAccountPage(req: Request, res: Response, next: NextFunction): void {
    // The account page should only show the list of the user's own surveys.
    if (!req.user) { // if req.user is undefined
        throw Error("Unreachable: this route handler is called only when the user is logged in");
    }

    const userId = req.user._id;

    Survey.find({ owner: userId }, function (err, surveyCollection) {
        if (err) {
            return next(err);
        }

        res.render("index", {
            title: "Account",
            page: "account",
            survey: surveyCollection,
        });
    });
}

/**
 * Display the login page
 */
export function displayLoginPage(req: Request, res: Response, _next: NextFunction): void {
    if (!req.user) {
        return res.render("index", { title: "Login", page: "login", messages: req.flash("loginMessage") });
    }

    res.redirect("/surveyavailable");
}

/**
 * Display the user register page
 */
export function displayRegisterPage(req: Request, res: Response, _next: NextFunction): void {
    if (!req.user) {
        return res.render("index", { title: "Register", page: "register", messages: req.flash("registerMessage") });
    }

    res.redirect("/account");
}

/**
 * Display the page to edit the info of the given user
 */
export function displayUserEditPage(req: Request, res: Response, _next: NextFunction): void {
    const id = req.params.id;

    if (req.user?._id?.toString() === id) {
        return res.render("index", { title: "EditUser", page: "edituser" });
    }

    res.redirect("/");
}


/*** PROCESS FUNCTIONS ***/

/**
 * Process a login request
 */
export function processLoginPage(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate("local", (err, user, _info) => {
        //are there server errors?
        if (err) {
            console.error(err);
            return next(err);
        }

        //are there login errors?
        if (!user) {
            req.flash("loginMessage", "Authentication Error");
            return res.redirect("/login");
        }

        req.login(user, (err) => {
            //are there db errors?
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.redirect("/surveyavailable");
        });
    })(req, res, next);
}

/**
 * Process a user register request
 */
export function processRegisterPage(req: Request, res: Response, _next: NextFunction): void {
    // instantiate a new User Object
    const newUser = new User({
        username: req.body.username,
        emailAddress: req.body.email,
        contactNumber: req.body.contactnumber,
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.error("Error: Inserting New User");
            if (err.name == "UserExistError") {
                console.error("Error: User Already Exist");
            }
            req.flash("registerMessage", "Registration Error");

            return res.redirect("/register");
        }

        // after successful registration - login the user
        passport.authenticate("local")(req, res, () => {
            res.redirect("/account");
        });
    });
}

/**
 * Process a logout request
 */
export function processLogoutPage(req: Request, res: Response, _next: NextFunction): void {
    req.logout();
    res.redirect("/login");
}

/**
 * Process a request to edit user info
 */
export function processEditPage(req: Request, res: Response, next: NextFunction): void {
    const id = req.params.id;

    if (req.user?._id?.toString() === id) {
        const updatedUser = new User({
            "_id": id,
            "emailAddress": req.body.email,
            "contactNumber": req.body.contactnumber,
        });

        User.updateOne({ _id: id }, updatedUser, {}, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/account");
        });
    }
}
