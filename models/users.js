//importing db and defining collection to be used
const db = require('../db')();
const COLLECTION = "users";
const notification = require('../email')();

module.exports = () => {
    //gets docs filtered by email if specified otherwise gets all docs in collection
    const get = async (email=null) => {             
        try{
            if(!email){
                const results = await db.get(COLLECTION);
                return {data: results}; 
            }
            const results = await db.get(COLLECTION,{email});
            return {data: results}; 
        } catch (ex) {
            return { error: ex }
        }
    }
   
    //adds to collection
    const add = async (name, email, usertype, key) => {    
        try{
            //lowercases the user's email 
            const emailLower = email.toLowerCase();
            //checks if the email already exists
            const existingEmail = await db.get(COLLECTION,{"email":emailLower});
            if(existingEmail.length>0){
                return {data: {error: "Email already exists", user: email}};
            }    
            const results = await db.add(COLLECTION,{            
                name: name,
                email: emailLower,
                usertype: usertype,
                key: key
            });
            notification.emailNotification(emailLower,"New User", "User " + name + " (" + emailLower + ") was created");            
            return {data: {status: "Data added successfully", user: results.ops}};                       
        } catch (ex) {
            return { error: ex }
        }
    }

    return {
        get,
        add
    }
};