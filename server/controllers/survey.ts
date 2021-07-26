/**
 * server/controllers/survey.ts
 *
 * Controllers for survey-related pages and database operations
 *
 * Polar Survey
 * @author Aun Raza (301074590)
 * @author Jamee Kim (301058465)
 * @author Jerome Ching (300817930)
 * @author Sophie Xu (301098127)
 * @author Tien Sang Nguyen (301028223)
 * @author Eunju Jo (301170731)
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response, NextFunction } from "express";
import Survey from "../models/survey";

/***DISPLAY FUNCTIONS***/

/**
 * Display the page for creating a survey
 */
export function displayMakeSurveyPage(req:Request, res: Response, _next: NextFunction):void
{
    res.render("index", { title: "Make Survey", page: "makesurvey"});
}

/**
 * Display the page with the list of currently available surveys
 */
export function displayAvailableSurvey(req:Request, res: Response, next: NextFunction):void
{
    getAvailableSurveys((err, surveys) => {
        if(err){
            return next(err);
        }
        res.render("index", { title: "Available Survey", page:"surveyavailable", survey: surveys});
    });

}

/**
 * Display the page where the user can answer to the survey
 */
export function displayQuestionPage(req:Request, res: Response, next: NextFunction):void
{
    const id = req.params.id;

    getSurveyById(id, (err, survey) => {
        if (err) {
            return next(err);
        }
        res.render("index", { title: "Question", page: "question", surveyField: survey});
    });
}

/**
 * Display the page to edit the survey
 */
export function displayEditSurveyPage(req:Request, res: Response, next: NextFunction):void
{
    const id = req.params.id;

    getSurveyById(id, (err, survey) => {
        if (err) {
            return next(err);
        }
        res.render("index", { title: "EditSurvey", page: "editsurvey", surveyItem: survey });
    });
}


/***PROCESS FUNCTIONS***/

/**
 * Process a request to create a survey
 */
export function processMakeSurveyPage(req:Request, res: Response, next: NextFunction):void
{
    const newSurvey = new Survey
    ({
        "questions": [
            req.body.question1,
            req.body.question2,
            req.body.question3,
            req.body.question4,
            req.body.question5,
        ],
        "title": req.body.title,
        "activeFrom": req.body.activeFrom,
        "expiresAt": req.body.expiresAt || undefined
    });
    //insert newSurvey to db
    Survey.create(newSurvey, (err) => {
        if(err)
        {
            return next(err);
        }
        res.redirect("/account");
    });
}

/**
 * Process a delete request of a survey object
 */
export function processDeleteSurvey(req:Request, res: Response, next: NextFunction):void
{
    const id = req.params.id;

    Survey.findByIdAndRemove(id, {}, (err) => {
        if(err)
        {
            return next(err);
        }
        res.redirect("/account");
    });
}

/**
 * Process an update request of a survey
 */
export function processEditSurveyPage(req:Request, res: Response, next: NextFunction):void
{
    const id = req.params.id;

    const updatedSurvey: Partial<Survey> = {
        "questions": [
            req.body.question1,
            req.body.question2,
            req.body.question3,
            req.body.question4,
            req.body.question5,
        ],
        "title": req.body.title,
        "activeFrom": req.body.activeFrom,
        "expiresAt": req.body.expiresAt || undefined
    };

    Survey.findByIdAndUpdate(id, updatedSurvey, {}, (err)=>{
        if(err)
        {
            return next(err);
        }
        res.redirect("/account");
    });
}

/***DATABASE FUNCTIONS***/

/**
 * Get the list of currently available surveys from the database
 */
export function getAvailableSurveys(done: (err: any, surveys: Survey[]) => void): void {
    const now = new Date();
    Survey.find({ activeFrom: { $lte: now } }).or([
        { expiresAt: { $exists: false } },
        { expiresAt: { $eq: undefined } },
        { expiresAt: { $gt: now } },
    ]).exec(done);
}

/**
 * Get a survey object with the given id from the database
 */
export function getSurveyById(surveyId: string, done: (err: any, res: Survey) => void): void
{
    // get survey id:db.Survey.find({"_id": SurveyId})
    Survey.findById(surveyId, done);
}

