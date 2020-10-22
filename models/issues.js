//importing db and defining collection to be used
const db = require('../db')();
const COLLECTION = "issues";

module.exports = () => {
    //gets docs filtered by issueNumber if specified otherwise gets all docs in collection
    const get = async (issueNumber=null) => {             
        if(!issueNumber){
            const issues = await db.get(COLLECTION);
            return issues; 
        }
        const issues = await db.get(COLLECTION,{issueNumber});
        return issues; 
    }

    //gets all docs filtered by project id
    const getByProjectId = async (project_id=null) => {            
        const issues = await db.get(COLLECTION,{project_id});
        return issues; 
    }
    
    //adds to collection
    const add = async (issueNumber, title, description, status, project_id) => {        
        const results = await db.add(COLLECTION,{
            issueNumber: issueNumber, 
            title: title,
            description: description,
            status: status,
            project_id: project_id 
        });
        return results.result;
    }

    //counts how many docs are in the collection filtered by a query
    const count = async(query) => {
        const counter = await db.count(COLLECTION,query);        
        return counter;
    }

    //updates the status of the issue id given
    const edit = async (issue_id, status) => {
        const results = await db.edit(COLLECTION,{"_id":issue_id},{"status":status})
        return results.result;
    }

    return {
        get,
        add,
        count,
        getByProjectId,
        edit
    }
};