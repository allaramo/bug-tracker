const db = require('../db')();
const COLLECTION = "projects";

module.exports = () => {
    
    const get = async (slug=null) => {             
        if(!slug){
            const projects = await db.get(COLLECTION);
            return projects; 
        }
        const projects = await db.get(COLLECTION,{slug});
        return projects; 
    }
    
    const add = async (slug, name, description) => {        
        const results = await db.add(COLLECTION,{
            slug: slug, 
            name: name,
            description: description
        });
        return results.result;
    }    

    return {
        get,
        add
    }
};