/**
 * server/controllers/response.ts
 *
 * Controller functions for the Response database model
 *
 * Polar Survey
 * @author Aun Raza (301074590)
 * @author Jamee Kim (301058465)
 * @author Jerome Ching (300817930)
 * @author Sophie Xu (301098127)
 * @author Tien Sang Nguyen (301028223)
 * @author Eunju Jo (301170731)
 */
import Survey from "../models/survey";
import Response from "../models/response";

//get Survey Id from database
export function getSurveyById(surveyId: string, done: (err: any, res: Survey) => void): void
{
    // get survey id:db.Survey.find({"_id": SurveyId})
    Survey.findById(surveyId, done);
}

// insert data in to the Response collection
export function insertResponse(response: Response, done: (err: any, res: Response) => void):void
{   //db.Response.create()
    Response.create(response,done);
}

/**
 * Get an array of user reponse to the survey with the given id
 *
 * @param surveyId The ID of the survey
 * @param done The callback function
 */
export function getAllResponse(surveyId: string, done: (err: any, res?: Response[]) => void): void
{
    Response.find({ question: surveyId }, (err, result) =>
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
