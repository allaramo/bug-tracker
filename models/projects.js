//importing db and defining collection to be used
const db = require('../db')();
const COLLECTION = "projects";

module.exports = () => {
    //gets docs filtered by slug if specified otherwise gets all docs in collection
    const get = async (slug=null) => {     
        try{        
            if(!slug){
                const results = await db.get(COLLECTION);
                return {data: results}; 
            }
            const results = await db.get(COLLECTION,{slug});
            return {data: results};  
        } catch (ex) {
            return { error: ex };
        }
    }
    
    //adds to collection
    const add = async (slug, name, description) => { 
        try{
            //uppercases the slug
            const slugUpper = slug.toUpperCase();
            //checks if slug already exists (in order to not duplicate issue's numbers)
            const existingSlug = await db.get(COLLECTION,{"slug":slugUpper});
            if(existingSlug.length>0){
                return {data: {error: "Slug already exists", project: slug}}; 
            }
            const results = await db.add(COLLECTION,{
                slug: slugUpper, 
                name: name,
                description: description
            }); 
            return {data: {status: "Data added successfully", project: results.ops}}; 
        } catch (ex) {
            return { error: ex };
        }     
    }    

    return {
        get,
        add
    }
};