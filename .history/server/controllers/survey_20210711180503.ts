import express, { Request, Response, NextFunction } from "express";

// question Model Reference - db.contact
import  question from "../models/question";

// Display (C)reate page
export function MakeSurvey(req: Request, res: Response, next: NextFunction): void
{
    // show the create view
    res.render("/makeSurvey", { title: "MakeSurvey", page: "makeSurvey", question:" " });
}

// Process (C)reate page
export function ProcessMakeSurveyPage(req: Request, res: Response, next: NextFunction): void
{
    // instantiate a new question
    const newQuestion = new question
    ({
        "YourQuestion": req.body.yourname, 
        "FirstChoice": req.body.choice1,
        "SecondChoice": req.body.choice2,
        "ThirdChoice": req.body.choice3,
        "ForthChoice": req.body.choice4

    });

    // db.question.insert({question data is here...})
    question.create(newQuestion, (err => {
        if (err)
        {
            console.error(err);
            res.end(err);
        }
        res.redirect("/question");
    }));
    
}

/// Display question page
export function DisplayQuestionPage(req: Request, res: Response, next: NextFunction): void
{   // pass the id to the db
    const id = req.params.id;

    // db.question.find({"_id": id})
    
    question.findById(id, {}, {}, (err, questionItemToEdit) => 
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        // show the question view
        res.render("question", { title: "Add", page: "Add", question: questionItemToEdit });
    });   
    
}



