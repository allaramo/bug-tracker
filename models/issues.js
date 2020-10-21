const db = require('../db')();
const COLLECTION = "issues";

module.exports = () => {
    
    const get = async (issueNumber=null) => {             
        if(!issueNumber){
            const issues = await db.get(COLLECTION);
            return issues; 
        }
        const issues = await db.get(COLLECTION,{issueNumber});
        return issues; 
    }

    const getByProjectId = async (project_id=null) => {            
        const issues = await db.get(COLLECTION,{project_id});
        return issues; 
    }
    
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

    const count = async(query) => {
        const counter = await db.count(COLLECTION,query);        
        return counter;
    }

    return {
        get,
        add,
        count,
        getByProjectId
    }
};