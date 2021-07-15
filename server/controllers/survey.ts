import express,{Request, Response, NextFunction} from "express";

//Survey Model reference
import Survey from "../models/survey";

//Display makesurvey page
export function displayMakeSurveyPage(req:Request, res: Response, next: NextFunction):void
{
    res.render("index",{title: "Make Survey", page: "makesurvey", surveyitem:""});
}

//Process makesurvey(C)
export function processMakeSurveyPage(req:Request, res: Response, next: NextFunction):void
{
    const newSurvey = new Survey
    ({
        "questions[0]": req.body.quetions1,
        "questions[1]": req.body.quetions2,
        "questions[2]": req.body.quetions3,
        "questions[3]": req.body.quetions4,
        "questions[4]": req.body.quetions5,
        "title": req.body.title,
        "activeFrom": req.body.activeFrom,
        "expiresAt":  req.body.expiresAt
    });
    //insert newSurvey to db
    Survey.create(newSurvey,(err)=>{
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        res.redirect("/surveyavailable");
    });
}
