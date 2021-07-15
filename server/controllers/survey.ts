import {Request, Response, NextFunction} from "express";

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
        "questions": [req.body.question1,req.body.question2,req.body.question3,req.body.question4,req.body.question5],
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

//Display available surveys (View)
export function displayAvailableSurvey(req:Request, res: Response, next: NextFunction):void
{
    Survey.find(function(err, surveyCollection){
        if(err){
            console.error(err);
            res.end(err);
        }
        res.render("index",{title: "Available Survey", page:"surveyavailable", survey: surveyCollection});
    });
}

//Delete available surveys through delete button
export function processDeleteAvailableSurvey(req:Request, res: Response, next: NextFunction):void
{
    const id = req.params.id;

    Survey.remove({_id:id}, (err)=>{
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        res.redirect("/surveyavailable");
    });

}


//Function to display question page, taking survey
export function displayQuestionPage(req:Request, res: Response, next: NextFunction):void
{
    const id = req.params.id;

    Survey.findById(id,{},{},(err, surveyTaking)=>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        res.render("index", {title: "Question", page: "question", surveyField: surveyTaking});
    });
}
