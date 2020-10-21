//importing db and defining collection to be used
const db = require('../db')();
const COLLECTION = "projects";

module.exports = () => {
    //gets docs filtered by slug if specified otherwise gets all docs in collection
    const get = async (slug=null) => {             
        if(!slug){
            const projects = await db.get(COLLECTION);
            return projects; 
        }
        const projects = await db.get(COLLECTION,{slug});
        return projects; 
    }
    
    //adds to collection
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