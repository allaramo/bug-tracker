//importing db and defining collection to be used
const db = require('../db')();
const COLLECTION = "comments";

module.exports = () => {
    //gets all docs in collection
    const get = async () => {            
        const comments = await db.get(COLLECTION);
        return comments;
    }

    //gets all docs in collection filtered by author (user)
    const getByAuthor = async (author=null) => {             
        const comments = await db.get(COLLECTION,{author});
        return comments; 
    }

    //gets all docs in collection filtered by issue id
    const getByIssueId = async (issue_id=null) => {            
        const comments = await db.get(COLLECTION,{issue_id});
        return comments; 
    }
    
    //adds to collection
    const add = async (text, author, issue_id) => {    
        const results = await db.add(COLLECTION,{
            text: text, 
            author: author,
            issue_id: issue_id
        });
        return results.result;
    }

    return {
        get,
        add,
        getByAuthor,
        getByIssueId
    }
};