import {Request, Response, NextFunction} from "express";

//Survey Model reference
import Survey from "../models/survey";

//Display makesurvey page
export function displayMakeSurveyPage(req:Request, res: Response, next: NextFunction):void
{
    res.render("index",{title: "Make Survey", page: "makesurvey", surveyitem:""});
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

//Function to display edit page
export function displayEditSurveyPage(req:Request, res: Response, next: NextFunction):void
{
    const id = req.params.id;

    Survey.findById(id,{},{},(err, surveyToEdit)=>{
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        res.render("index", {title: "Edit Survey", page: "editsurvey", surveyItem: surveyToEdit});
    });
}

//Display account page (View)
export function displayAccountPage(req:Request, res: Response, next: NextFunction):void
{
    Survey.find(function(err, surveyCollection){
        if(err){
            console.error(err);
            res.end(err);
        }
        res.render("index",{title: "Account", page:"account", survey: surveyCollection});
    });
}

/***PROCESS FUNCTION***/
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

//Process edit survey page
export function processEditSurveyPage(req:Request, res: Response, next: NextFunction):void
{
    const id = req.params.id;

    const updatedSurvey = new Survey
    ({
        "_id": id,
        "questions": [req.body.question1,req.body.question2,req.body.question3,req.body.question4,req.body.question5],
        "title": req.body.title,
        "activeFrom": req.body.activeFrom,
        "expiresAt":  req.body.expiresAt
    });

    Survey.updateOne({_id: id}, updatedSurvey,{}, (err)=>{
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        res.redirect("/account");
    });
}
