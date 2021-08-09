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
import Survey, { SurveyMethods, SurveyChoice, SurveyYesNo } from "../models/survey";

/*** DISPLAY FUNCTIONS ***/

/**
 * Display the page for creating a survey
 */
export function displayMakeSurveyPage(req: Request, res: Response, _next: NextFunction): void {
    res.locals.scripts.push("tableSwitch");
    res.render("index", { title: "Make Survey", page: "makesurvey" });
}

/**
 * Display the page with the list of currently available surveys
 */
export function displayAvailableSurvey(req: Request, res: Response, next: NextFunction): void {
    getAvailableSurveys((err, surveys) => {
        if (err) {
            return next(err);
        }
        res.render("index", { title: "Available Survey", page: "surveyavailable", survey: surveys });
    });
}

/**
 * Display the page where the user can answer to the survey
 */
export function displayQuestionPage(req: Request, res: Response, next: NextFunction): void {
    const id = req.params.id;

    getSurveyById(id, (err, survey) => {
        if (err) {
            return next(err);
        }

        if (!survey?.isActive()) {
            // The survey is not found, or it is not currently active
            return res.redirect("/surveyavailable");
        }

        res.render("index", { title: "Question", page: "question", surveyField: survey });
    });
}

/**
 * Display the page to edit the survey
 */
export function displayEditSurveyPage(req: Request, res: Response, next: NextFunction): void {
    const id = req.params.id;
    if (!req.user) { // if req.user is undefined
        throw Error("Unreachable: this route handler is called only when the user is logged in");
    }
    const userId = req.user._id;
    getSurveyById(id, (err, survey) => {
        if (err) {
            return next(err);
        }
        //check if user's id equals to the survey's owner
        if (!survey || !userId?.equals(survey.owner)) { // user's id does not equal the survey's owner
            return res.redirect("/account"); // redirect to the account page
        }
        res.render("index", { title: "EditSurvey", page: "editsurvey", surveyItem: survey });
    });
}


/*** PROCESS FUNCTIONS ***/

/**
 * Process a request to create a survey
 */
export function processMakeSurveyPage(req: Request, res: Response, next: NextFunction): void {    // if req.user is undefined,then throw error
    if (!req.user) {
        throw Error("Unreachable: this route handler is called only when the user is logged in");
    }
    // pass the user _id to variable userId
    const userId = req.user._id;
    let newSurvey;
    if (req.body.SurveyType === "TF") {
        newSurvey = new SurveyYesNo({
            questions: [
                req.body.question1,
                req.body.question2,
                req.body.question3,
                req.body.question4,
                req.body.question5,
            ],
            title: req.body.title,
            activeFrom: req.body.activeFrom,
            expiresAt: req.body.expiresAt || undefined,
            activeOverride: req.body.isActiveStateOverridden ? req.body.activeOverride === "true" : undefined,
            owner: userId,
        });
    } else {
        newSurvey = new SurveyChoice({
            questions: [
                { question: req.body.question1, choices: [req.body.answer11, req.body.answer12, req.body.answer13, req.body.answer14] },
                { question: req.body.question2, choices: [req.body.answer21, req.body.answer22, req.body.answer23, req.body.answer24] },
                { question: req.body.question3, choices: [req.body.answer31, req.body.answer32, req.body.answer33, req.body.answer34] },
                { question: req.body.question4, choices: [req.body.answer41, req.body.answer42, req.body.answer43, req.body.answer44] },
                { question: req.body.question5, choices: [req.body.answer51, req.body.answer52, req.body.answer53, req.body.answer54] },
            ],
            title: req.body.title,
            activeFrom: req.body.activeFrom,
            expiresAt: req.body.expiresAt || undefined,
            activeOverride: req.body.isActiveStateOverridden ? req.body.activeOverride === "true" : undefined,
            owner: userId,
        });
    }
    //insert newSurvey to db
    Survey.create(newSurvey, (err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/account");
    });
}

/**
 * Process a delete request of a survey object
 */
export function processDeleteSurvey(req: Request, res: Response, next: NextFunction): void {
    if (!req.user) { // if req.user is undefined
        throw Error("Unreachable: this route handler is called only when the user is logged in");
    }
    const userId = req.user._id;
    const id = req.params.id;
    // find the survey by survey id and owen and remove it
    Survey.findOneAndRemove({ owner: userId, _id: id }, {}, (err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/account");
    });
}

/**
 * Process an update request of a survey
 */
export function processEditSurveyPage(req: Request, res: Response, next: NextFunction): void {
    if (!req.user) { // if req.user is undefined
        throw Error("Unreachable: this route handler is called only when the user is logged in");
    }
    const userId = req.user._id;
    const id = req.params.id;

    getSurveyById(id, (err, survey) => {
        if (err) {
            return next(err);
        }

        if (!survey || !survey.owner.equals(userId)) {
            return res.redirect("/account");
        }

        survey.title = req.body.title;
        survey.activeFrom = req.body.activeFrom;
        survey.expiresAt = req.body.expiresAt || undefined;
        survey.activeOverride = req.body.isActiveStateOverridden ? req.body.activeOverride === "true" : undefined;

        if (survey.type === "yesno") {
            survey.questions = [
                req.body.question1,
                req.body.question2,
                req.body.question3,
                req.body.question4,
                req.body.question5,
            ];
        } else {
            survey.questions = [
                { question: req.body.question1, choices: [req.body.answer11, req.body.answer12, req.body.answer13, req.body.answer14] },
                { question: req.body.question2, choices: [req.body.answer21, req.body.answer22, req.body.answer23, req.body.answer24] },
                { question: req.body.question3, choices: [req.body.answer31, req.body.answer32, req.body.answer33, req.body.answer34] },
                { question: req.body.question4, choices: [req.body.answer41, req.body.answer42, req.body.answer43, req.body.answer44] },
                { question: req.body.question5, choices: [req.body.answer51, req.body.answer52, req.body.answer53, req.body.answer54] },
            ];
        }

        survey.save({}, (err) => {
            if (err) {
                return next(err);
            }

            res.redirect("/account");
        });
    });
}

/*** DATABASE FUNCTIONS ***/

/**
 * Get the list of currently available surveys from the database
 */
export function getAvailableSurveys(done: (err: any, surveys: Survey[]) => void): void {
    const now = new Date();
    Survey.find({
        $or: [
            { activeOverride: true },
            {
                $and: [
                    { activeOverride: { $ne: false } },
                    { activeFrom: { $lte: now } },
                    {
                        $or: [
                            { expiresAt: { $exists: false } },
                            { expiresAt: { $eq: undefined } },
                            { expiresAt: { $gt: now } },
                        ],
                    },
                ],
            },
        ],
    }, done);
}

/**
 * Get a survey object with the given id from the database
 */
export function getSurveyById(surveyId: string, done: (err: any, res?: Survey & SurveyMethods) => void): void {
    // get survey id:db.Survey.find({"_id": SurveyId})
    Survey.findById(surveyId, done);
}
