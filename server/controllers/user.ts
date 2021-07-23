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

/**
 * Display the account page for the user
 */
 export function displayAccountPage(req:Request, res: Response, next: NextFunction): void {
    // TODO This is a temporary version because we do not have any registered users
    // Once we have users, we do not need this `Survey.find` call.
    Survey.find(function(err, surveyCollection){
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
