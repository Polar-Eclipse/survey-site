/**
 * server/controllers/response.ts
 *
 * Controller for the responses-related pages
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
import { Document } from "mongoose";
import ResponseM from "../models/response";
import Survey from "../models/survey";
import { getSurveyById } from "./survey";
import { downloadResource } from "../util";

/*** DISPLAY FUNCTIONS ***/

/**
 * Display the results page of the given survey
 */
export function displayResult(req: Request, res: Response, next: NextFunction): void {
    const id = req.params.id;

    getAllResponse(id, (err, selectedResponse) => {
        if (err || !selectedResponse) {
            return next(err);
        }

        const answeredTrue = [0, 0, 0, 0, 0];

        for (let i = 0; i < selectedResponse.length; i++) {
            for (let j = 0; j < selectedResponse[i].answers.length; j++) { //survey
                if (selectedResponse[i].answers[j] == "True") { //answers
                    answeredTrue[j] = answeredTrue[j] + 1;
                }
            }
        }
        res.locals.scripts.push("charts");
        res.render("index", {
            title: "Survey Response",
            page: "surveyresponse",
            surveyResponses: selectedResponse,
            tally: answeredTrue,
        });
    });
}


/*** PROCESS FUNCTIONS ***/

/**
 * Process the request to create a new response to the given survey
 */
export function processQuestion(req: Request, res: Response, next: NextFunction): void {
    const id = req.params.id;

    getSurveyById(id, (err, survey) => {
        if (err) {
            return next(err);
        }

        if (!survey?.isActive()) {
            return res.redirect("/surveyavailable");
        }

        const newResponse = new ResponseM({
            answers: [
                req.body.answer1,
                req.body.answer2,
                req.body.answer3,
                req.body.answer4,
                req.body.answer5,
            ],
            question: id,
        });

        ResponseM.create(newResponse, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/surveyavailable");
        });
    });
}

/**
 * Process a request to delete a response
 */
export function processDeleteResult(req: Request, res: Response, next: NextFunction): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = req.user!._id!;
    const id = req.params.id;

    // We want to check if the user actually owns the survey the given response answers to.
    // This is dangerous because this does not prevent other people from changing the data in the database.
    // We are creating a remove operation based on a possibly stale piece of information.
    // There are various ways to prevent this, but we'll leave it as it is for now.
    ResponseM.findById(id).populate("question").exec((err, response) => {
        if (err) {
            return next(err);
        }

        if (!response?.populated("question")) {
            // Failed to populate the `question` field, which should be a Survey object.
            // We cannot check if the user has the rights to remove the response.
            return res.redirect("/account");
        }

        // The `question` field is populated, so we have the Survey model object
        const survey = response.question as unknown as Survey & Document;

        if (userId.equals(survey.owner)) {
            // The user has the rights to remove the response
            ResponseM.findByIdAndRemove(id, {}, (err) => {
                if (err) {
                    return next(err);
                }
                res.redirect(`/surveyresponse/${survey._id}`); // redirect to the results page
            });
        } else {
            // The user does not have the rights to remove the response
            res.redirect("/account");
        }
    });
}


/*** DATABASE FUNCTIONS ***/

/**
 * Insert a new Response object to the database
 */
export function insertResponse(response: ResponseM, done: (err: any, res: ResponseM) => void): void {
    ResponseM.create(response, done);
}

/**
 * Get an array of user reponse to the survey with the given id
 *
 * @param surveyId The ID of the survey
 * @param done The callback function
 */
export function getAllResponse(surveyId: string, done: (err: any, res?: ResponseM[]) => void): void {
    ResponseM.find({ question: surveyId }, (err, result) => {
        if (err) {
            done(err);
        } else {
            done(undefined, result);
        }
    });
}
export async function downloadRaw (req: Request, res: Response, next: NextFunction){
    if (!req.user) { // if req.user is undefined
        throw Error("Unreachable: this route handler is called only when the user is logged in");
    }
    const id = req.params.id;
    const questionsCol = await Survey.findById(id);
    const fields =
    [
        {
            label: questionsCol?.title,
            value: 'title'
        },
        {
            label: questionsCol?.questions[0],
            value: 'answers[0]'
        },
        {
            label: questionsCol?.questions[1],
            value: 'answers[1]'
        },
        {
            label: questionsCol?.questions[2],
            value: 'answers[2]'
        },
        {
            label: questionsCol?.questions[3],
            value: 'answers[3]'
        },
        {
            label: questionsCol?.questions[4],
            value: 'answers[4]'
        },
        {
            label: 'Created At',
            value: 'createdAt'
        },
    ]
    const data = await ResponseM.find({question: id});
    //@ts-ignore
    downloadResource(res, 'response.csv', fields, data);
}

