/**
 * server/controllers/user.ts
 *
 * Controllers for user-related pages and database operations
 *
 * Polar Survey
 * @author Aun Raza (301074590)
 * @author Jamee Kim (301058465)
 * @author Jerome Ching (300817930)
 * @author Sophie Xu (3010981127)
 * @author Tien Sang Nguyen (301028223)
 * @author Eunju Jo (301170731)
 */

import { Request, Response, NextFunction } from "express";
import Survey from "../models/survey";

/**
 * Display the account page for the user
 */
export function displayAccountPage(req:Request, res: Response, next: NextFunction): void {
    // TODO This is a temporary version because we do not have any registered users
    // Once we have users, we do not need this `Survey.find` call.
    Survey.find(function(err, surveyCollection){
        if(err){
            return next(err);
        }
        res.render("index",{title: "Account", page:"account", survey: surveyCollection});
    });
}
