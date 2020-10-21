const db = require('../db')();
const COLLECTION = "users";

module.exports = () => {
    
    const get = async (name=null) => {             
        if(!name){
            const users = await db.get(COLLECTION);
            return users; 
        }
        const users = await db.get(COLLECTION,{name});
        return users; 
    }
    
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