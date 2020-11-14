//importing models
const comments = require('../models/comments')();
const issues = require('../models/issues')();
const users = require('../models/users')();

module.exports = () => {
    //gets all docs
    const getController = async (req, res) => {
        const {commentList, err} = await comments.get();
        if (err) {
            return res.status(500).json({err});
        }
        res.json({comments: commentList});
    }

    //gets all docs filtered by slug
    const getById = async (req, res) => {      
        res.json(await comments.get(parseInt(req.params.id)));
    }

    //gets all docs filtered by issue number
    const getByIssueNumber = async (req, res) => {  
        //gets the issue info of the issue number sent
        const issue = await issues.get(req.params.issueNumber);   
        if(issue.length>0){
            res.json(await comments.getByIssueId(issue[0]._id));
        } else {
            res.json("Issue Number not found");
        } 
    }

    //gets all docs filtered by author (user)
    const getByAuthor = async (req, res) => { 
        //gets the user info of the author (user email) sent
        const user = await users.get(req.params.author); 
        if(user.length>0){
            res.json(await comments.getByAuthor(user[0]._id));
        } else {
            res.json("Email not found");
        }
        
    }

    //inserts a document
    const postController = async (req, res) => {
        //gets the user info of the author (user name) sent
        const author = await users.get(req.body.author);
        //gets the issue info of the issue number sent
        const issue_id = await issues.get(req.params.issueNumber);              
        const text = req.body.text;
        const result = await comments.add(text, author[0]._id, issue_id[0]._id);
        res.json(result);
    }
    
    return {
        getController,
        postController,
        getByIssueNumber,
        getByAuthor,
        getById
    }
}