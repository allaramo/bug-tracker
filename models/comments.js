const db = require('../db')();
const COLLECTION = "comments";

module.exports = () => {
    
    const get = async () => {            
        const comments = await db.get(COLLECTION);
        return comments;
    }

    const getByAuthor = async (author=null) => {             
        const comments = await db.get(COLLECTION,{author});
        return comments; 
    }

    const getByIssueId = async (issue_id=null) => {            
        const comments = await db.get(COLLECTION,{issue_id});
        return comments; 
    }
    
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