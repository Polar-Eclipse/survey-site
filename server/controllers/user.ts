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
import Survey from "../models/survey";
import ResponseM from "../models/response";
import passport from "passport";

//create an instance of the User model
import User from "../models/user";

/**
 * Display the account page for the user
 */
export function displayAccountPage(req:Request, res: Response, next: NextFunction): void {
    // The account page should only show the list of the user's own surveys.
    if (!req.user) { // if req.user is undefined
        throw Error("Unreachable: this route handler is called only when the user is logged in");
    }
    const userId = req.user._id;
    Survey.find({owner: userId }, function (err, surveyCollection) {
        ResponseM.find(function(err2, responseCollection){
            if (err2){
                return next (err2);
            }

            if(err){
                return next(err);
            }

            res.render("index",{title: "Account", page:"account", survey: surveyCollection, response: responseCollection});
        });

    });
}


export function displayLoginPage(req:Request, res: Response, next: NextFunction): void {
    if(!req.user)
    {
        return res.render("index", {title: "Login", page: "login", messages: req.flash("loginMessage")});
    }
    return res.redirect("/surveyavailable");
}

export function displayRegisterPage(req:Request, res: Response, next: NextFunction): void {
    if(!req.user)
    {
        res.render("index", {title: "Register", page: "register", messages: req.flash("registerMessage")});
    }

}

export function displayUserEditPage(req:Request, res: Response, next: NextFunction): void {

    const id = req.params.id;

    if(req.user?._id.toString() === id )
    {
        return res.render("index", {title: "EditUser", page: "edituser"});
    }
    return res.redirect("/");

}

export function processLoginPage(req:Request, res: Response, next: NextFunction): void {
    passport.authenticate("local", (err, user, info) =>{
        //are there server errors?
        if(err)
        {
            console.error(err);
            return next(err);
        }

        //are there login errors?
        if(!user)
        {
            req.flash("loginMessage", "Authentication Error");
            return res.redirect("/login");
        }

        req.login(user, (err) =>{
            //are there db errors?
            if(err)
            {
                console.error(err);
                return next(err);
            }
            return res.redirect("/surveyavailable");
        });
    })(req, res, next);

}

export function processRegisterPage(req:Request, res: Response, next: NextFunction): void {
    // instantiate a new User Object
    const newUser = new User
    ({
        username: req.body.username,
        emailAddress: req.body.email,
        contactNumber: req.body.contactnumber,
    });

    User.register(newUser, req.body.password,(err)=>
    {
        if(err)
        {
            console.error("Error: Inserting New User");
            if(err.name == "UserExistError")
            {
                console.error("Error: User Already Exist");
            }
            req.flash("registerMessage", "Registration Error");

            return res.redirect("/register");
        }

        // after successful registration - login the user
        return passport.authenticate("local")(req, res, ()=>{
            return res.redirect("/account");
        });
    });

}

export function processLogoutPage(req:Request, res: Response, next: NextFunction): void {
    req.logout();

    res.redirect("/login");
}

export function processEditPage(req: Request, res: Response, next: NextFunction): void {
    const id = req.params.id;
    if(req.user?._id.toString() === id)
    {
        const updatedUser = new User
        ({
            "_id": id,
            "username": req.body.username,
            "emailAddress": req.body.email,
            "contactNumber": req.body.contactnumber
        });
        User.updateOne({_id: id}, updatedUser, {}, (err) =>{

            if(err)
            {
                return next(err);
            }
            res.redirect("/account");
        });
    }


}
