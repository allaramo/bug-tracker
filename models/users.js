//importing db and defining collection to be used
const db = require('../db')();
const COLLECTION = "users";

module.exports = () => {
    //gets docs filtered by name if specified otherwise gets all docs in collection
    const get = async (name=null) => {             
        if(!name){
            const users = await db.get(COLLECTION);
            return users; 
        }
        const users = await db.get(COLLECTION,{name});
        return users; 
    }
    
    //adds to collection
    const add = async (name, email, usertype) => {        
        const results = await db.add(COLLECTION,{            
            name: name,
            email: email,
            usertype: usertype
        });
        return results.result;
    }

    return {
        get,
        add
    }
};