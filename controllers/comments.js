//importing models
const comments = require('../models/comments')();
const issues = require('../models/issues')();
const users = require('../models/users')();

module.exports = () => {
    //gets all docs
    const getController = async (req, res) => {
        res.json(await comments.get());
    }

    //gets all docs filtered by issue number
    const getByIssueNumber = async (req, res) => {  
        //gets the issue info of the issue number sent
        const issue = await issues.get(req.params.issueNumber);       
        res.json(await comments.getByIssueId(issue[0]._id));
    }

    //gets all docs filtered by author (user)
    const getByAuthor = async (req, res) => { 
        //gets the user info of the author (user name) sent
        const user = await users.get(req.params.author); 
        res.json(await comments.getByAuthor(user[0]._id));
    }

    //inserts a document
    const postController = async (req, res) => {
        //gets the user info of the author (user name) sent
        const author = await users.get(req.body.author);
        //gets the issue info of the issue number sent
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