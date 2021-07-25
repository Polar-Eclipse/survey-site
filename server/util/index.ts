import express, {Request, Response, NextFunction} from "express";
import User from "../models/user";


export function UserDisplayUserName(req: Request):  string
{
    if(req.user)
    {
        const user = req.user as User;
        return user.username.toString();
    }
    return "";
}

export function Authguard(req: Request, res: Response, next: NextFunction):void
{
    if(!req.isAuthenticated())
    {
        return res.redirect("/login");
    }
    next();
}
