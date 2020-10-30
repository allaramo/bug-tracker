//importing db and defining collection to be used
const db = require('../db')();
const COLLECTION = "users";

module.exports = () => {
    //gets docs filtered by email if specified otherwise gets all docs in collection
    const get = async (email=null) => {             
        if(!email){
            const users = await db.get(COLLECTION);
            return users; 
        }
        const users = await db.get(COLLECTION,{email});
        return users; 
    }
   
    //adds to collection
    const add = async (name, email, usertype, key) => {    
        //lowercases the user's email 
        const emailLower = email.toLowerCase();
        //checks if the email already exists
        const existingEmail = await db.get(COLLECTION,{"email":emailLower});
        if(existingEmail.length>0){
            return "Error: Email already exists"
        }    
        const results = await db.add(COLLECTION,{            
            name: name,
            email: emailLower,
            usertype: usertype,
            key: key
        });
        return results.result;
    }

    return {
        get,
        add
    }
};