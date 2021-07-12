import express, { Request, Response, NextFunction } from "express";

// question Model Reference - db.contact
import  question from "../models/question";

// Display Functions

//(R)ead in CRUD 
//Display 
/** 
export function  MakeSurveyPage(req: Request, res: Response, next: NextFunction): void
{
    // db.contact.find() will parse the data to the MakeSurvey web page
    question.find((err, questionCollection) =>
    { if(err)
    {console.error(err);
        res.end(err);
    }
    res.render("index", { title: "MakeSurvey", page: "makeSurvey", question:questionCollection });

    });
   
}
*/

// Display (E)dit()update page
/** 
export function DisplayEditPage(req: Request, res: Response, next: NextFunction): void
{   // pass the id to the db
    let id = req.params.id;

    // db.contact.find({"_id": id})

    contact.findById(id, {}, {}, (err, contactItemToEdit) => 
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        // show the edit view
        res.render('update', { title: 'Edit', page: 'update', contact: contactItemToEdit, displayName: UserDisplayName(req)  });
    });   
    
  }
*/
// Display (C)reate page
export function MakeSurvey(req: Request, res: Response, next: NextFunction): void
{
    // show the edit view
    res.render("index", { title: "MakeSurvey", page: "makeSurvey", question:" " });
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


// Process Functions

// Process (E)dit page
export function ProcessEditPage(req: Request, res: Response, next: NextFunction): void
{
    const id = req.params.id;

    // instantiate a new contact Item
    const updatedContactItem = new contact
    ({
        "_id": id,
        "ContactName":req.body.ContactName,
        "ContactNumber":req.body.ContactNumber,
        "EmailAddress":req.body.EmailAddress
     
    });
  
    // find the contact item via db.contact.update({"_id":id}) and then update
    contact.updateOne({_id: id}, updatedContactItem, {}, (err) =>{
        if(err)
        {
            console.error(err);
            res.end(err);
        }
  
        res.redirect("/contacts_list");
    });
}



// Process (D)elete page
export function ProcessDeletePage(req: Request, res: Response, next: NextFunction): void
{
    const id = req.params.id;

    // db.contact.remove({"_id: id"})
    contact.remove({_id: id}, (err) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        res.redirect("/contacts_list");
    });
  
}