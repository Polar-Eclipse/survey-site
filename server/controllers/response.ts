import Response from "../models/reponse";

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
