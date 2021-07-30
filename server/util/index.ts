/**
 * server/util/index.ts
 *
 * Utility functions used throughout the app
 *
 * Polar Survey
 * @author Aun Raza (301074590)
 * @author Jamee Kim (301058465)
 * @author Jerome Ching (300817930)
 * @author Sophie Xu (301098127)
 * @author Tien Sang Nguyen (301028223)
 * @author Eunju Jo (301170731)
 */

import express, {Request, Response, NextFunction} from "express";
import User from "../models/user";




export function authguard(req: Request, res: Response, next: NextFunction):void
{
    if(!req.isAuthenticated())
    {
        return res.redirect("/login");
    }
    next();
}
