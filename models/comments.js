//importing db and defining collection to be used
const db = require('../db')();
const COLLECTION = "comments";

module.exports = () => {
    //gets all docs in collection
    const get = async (id=null) => {  
        try{  
            if(!id){
                const comments = await db.get(COLLECTION);
                return comments;
            }        
            const comments = await db.get(COLLECTION,{id});
            return comments;
        } catch (ex) {
            return { error: ex }
        }
    }

    //gets all docs in collection filtered by author (user)
    const getByAuthor = async (author=null) => {      
        try{       
            const comments = await db.get(COLLECTION,{author});
            return comments; 
        } catch (ex) {
            return { error: ex }
        }
    }

    //gets all docs in collection filtered by issue id
    const getByIssueId = async (issue_id=null) => {   
        try{         
            const comments = await db.get(COLLECTION,{issue_id});
            return comments; 
        } catch (ex) {
            return { error: ex }
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
            return results.result;
        } catch (ex) {
            return { error: ex }
        }
    }

    return {
        get,
        add,
        getByAuthor,
        getByIssueId
    }
};