/**
 * server/controllers/response
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

import Response from "../models/response";

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
