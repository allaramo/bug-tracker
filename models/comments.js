//importing db and defining collection to be used
const db = require('../db')();
const COLLECTION = "comments";

module.exports = () => {
    //gets all docs in collection
    const get = async (id=null) => {  
        try{            
            if(!id){
                const results = await db.get(COLLECTION);
                return {data: results}; 
            }
            const results = await db.get(COLLECTION,{id});
            return {data: results};
        } catch (ex) {
            return { error: ex };
        }
    }

    //gets all docs in collection filtered by author (user)
    const getByAuthor = async (author=null) => {      
        try{       
            const results = await db.get(COLLECTION,{author});
            return {data: results};
        } catch (ex) {
            return { error: ex };
        }
    }

    //gets all docs in collection filtered by issue id
    const getByIssueId = async (issue_id=null) => {   
        try{         
            const results = await db.get(COLLECTION,{issue_id});
            return {data: results};
        } catch (ex) {
            return { error: ex };
        }
    }
    
    //adds to collection
    const add = async (text, author, issue_id) => { 
        try{ 
            const commentCount = await db.count(COLLECTION);
            const results = await db.add(COLLECTION,{
                id: commentCount + 1,
                text: text, 
                author: author,
                issue_id: issue_id
            });
            return {data: {status: "Data added successfully", comment: results.ops}}; 
        } catch (ex) {
            return { error: ex };
        }
    }

    return {
        get,
        add,
        getByAuthor,
        getByIssueId
    }
};