const comments = require('../models/comments.js')();
const issues = require('../models/issues.js')();
const users = require('../models/users.js')();
module.exports = () => {
    const getController = async (req, res) => {
        res.json(await comments.get());
    }

    const getByIssueNumber = async (req, res) => {  
        const issue = await issues.get(req.params.issueNumber);       
        res.json(await comments.getByIssueId(issue[0]._id));
    }

    const getByAuthor = async (req, res) => { 
        const user = await users.get(req.params.author); 
        res.json(await comments.getByAuthor(user[0]._id));
    }

    const postController = async (req, res) => {
        const author = await users.get(req.body.author);
        const issue_id = await issues.get(req.body.issueNumber);              
        const text = req.body.text;
        const result = await comments.add(text, author[0]._id, issue_id[0]._id);
        res.json(result);
    }
    
    return {
        getController,
        postController,
        getByIssueNumber,
        getByAuthor
    }
}