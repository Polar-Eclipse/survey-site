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
import ResponseM from "../models/response";

// insert data in to the Response collection
export function insertResponse(response: ResponseM, done: (err: any, res: ResponseM) => void):void
{   //db.Response.create()
    ResponseM.create(response,done);
}

/**
 * Get an array of user reponse to the survey with the given id
 *
 * @param surveyId The ID of the survey
 * @param done The callback function
 */
export function getAllResponse(surveyId: string, done: (err: any, res?: ResponseM[]) => void): void
{
    ResponseM.find({ question: surveyId }, (err, result) =>
    {
        if (err)
        {
            done(err);
        }
        else
        {
            done(undefined, result);
        }
    });
}
export function processQuestion(req: Request, res: Response, next: NextFunction): void
{
    const id = req.params.id;
    const newResponse = new ResponseM
    ({
        "answers": [
            req.body.answer1,
            req.body.answer2,
            req.body.answer3,
            req.body.answer4,
            req.body.answer5,
        ],
        "question": id,
        "title": req.body.title
    });
    ResponseM.create(newResponse, (err) => {
        if(err)
        {
            return next(err);
        }
        res.redirect("/surveyavailable");
    });
}

export function processDeleteResult(req:Request, res: Response, next: NextFunction):void
{
    const id = req.params.id;

    ResponseM.findByIdAndRemove(id, {}, (err) => {
        if(err)
        {
            return next(err);
        }
        res.redirect("/account");
    });
}

//Get Survey Result site
export function displayResult(req: Request, res: Response, next: NextFunction): void
{
    const id = req.params.id;
    getAllResponse(id, (err, selectedResponse) => {
        if (err || !selectedResponse) {
            return next(err);
        }
        let answeredTrue = [0, 0, 0, 0, 0];
        for(let i = 0; i < selectedResponse.length; i++ )
        {
            for(let j = 0; j < selectedResponse[i].answers.length; j++ ) //survey
            {

                if(selectedResponse[i].answers[j] == "True") //answers
                {
                    answeredTrue[j] = answeredTrue[j] + 1;
                }
            }
        }
        res.render("index", { title: "Survey Response", page: "surveyresponse", surveyResponses: selectedResponse, tally: answeredTrue});
    });

}

