import express, {Request, Response, NextFunction} from "express";
import User from "../models/user";


export function userDisplayUserName(req: Request):  string
{
    if(req.user)
    {
        const user = req.user as User;
        return user.username.toString();
    }
    return "";
}

export function authguard(req: Request, res: Response, next: NextFunction):void
{
    if(!req.isAuthenticated())
    {
        return res.redirect("/login");
    }
    next();
}
