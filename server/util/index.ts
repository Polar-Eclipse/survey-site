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
