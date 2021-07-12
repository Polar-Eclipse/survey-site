import express, { Request, Response, NextFunction } from 'express';

// question Model Reference - db.contact
import  question from "../models/question";

// Display Functions

//(R)ead in CRUD
export function  MakeSurveyPage(req: Request, res: Response): void
{
    // db.contact.find() will parse the data to the MakeSurvey web page
    question.find((err, questionCollection) =>
    { if(err)
    {console.error(err);
        res.end(err);
    }
    res.render
    res.render("index", { title: "MakeSurvey", page: "makeSurvey", question:questionCollection });

    });
   
}

// Display (E)dit()update page
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

// Display (C)reate page
export function DisplayAddPage(req: Request, res: Response, next: NextFunction): void
{
    // show the edit view
    res.render('update',{title:'Add', page:'update',contact: '', displayName: UserDisplayName(req)});
}



// Process Functions

// Process (E)dit page
export function ProcessEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new contact Item
    let updatedContactItem = new contact
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
  
      res.redirect('/contacts_list');
    });
}

// Process (C)reate page
export function ProcessAddPage(req: Request, res: Response, next: NextFunction): void
{
  // instantiate a new contact
  let newContact = new contact
  ({
    "ContactName": req.body.ContactName,
    "ContactNumber": req.body.ContactNumber,
    "EmailAddress": req.body.EmailAddress
   
  });
  

  // db.contact.insert({contact data is here...})
  contact.create(newContact, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/contacts_list');
  });
}


// Process (D)elete page
export function ProcessDeletePage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

  // db.contact.remove({"_id: id"})
  contact.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    res.redirect('/contacts_list');
  });
  
}