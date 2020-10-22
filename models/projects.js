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
        //uppercases the slug
        const slugUpper = slug.toUpperCase();
        //checks if slug already exists (in order to not duplicate issue's numbers)
        const existingSlug = await db.get(COLLECTION,{"slug":slugUpper});
        if(existingSlug.length>0){
            console.log("<<< Error: Slug already exists >>>")
            return "Error: Slug already exists"
        }
        const results = await db.add(COLLECTION,{
            slug: slugUpper, 
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