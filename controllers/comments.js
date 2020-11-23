//importing models
const comments = require('../models/comments')();
const issues = require('../models/issues')();
const users = require('../models/users')();

module.exports = () => {
    //gets all docs
    const getController = async (req, res) => {
        const {data, err} = await comments.get();
        if (err) {
            return res.status(500).json({err});
        }
        res.json({comments: data});
    }

    //gets all docs filtered by id
    const getById = async (req, res) => {      
        const {data, err} = await comments.get(parseInt(req.params.id));
        if (err) {
            return res.status(500).json({err});
        }
        res.json({comments: data});
    }

    //gets all docs filtered by issue number
    const getByIssueNumber = async (req, res) => {  
        //gets the issue info of the issue number sent
        const issue = await issues.get(req.params.issueNumber);   
        if(issue.data.length>0){
            const {data, err} = await comments.getByIssueId(issue.data[0]._id);
            if (err) {
                return res.status(500).json({err});
            }
            res.json({comments: data});
        } else {
            return res.status(500).json({error: "Issue Number not found"});
        } 
    }

    //gets all docs filtered by author (user)
    const getByAuthor = async (req, res) => { 
        //gets the user info of the author (user email) sent
        const user = await users.get(req.params.author); 
        if(user.data.length>0){
            const {data, err} = await comments.getByAuthor(user.data[0]._id);
            if (err) {
                return res.status(500).json({err});
            }
            res.json({comments: data});
        } else {
            return res.status(500).json({error: "Email not found"});
        }
        
    }

    //inserts a document
    const postController = async (req, res) => {
        if (req.body.author && req.params.issueNumber && req.body.text){
            //gets the user info of the author (user name) sent
            const author = await users.get(req.body.author);
            if(!author.data.length>0){
                return res.status(500).json({error: "Author not found"}); 
            }
            //gets the issue info of the issue number sent
            const issue_id = await issues.get(req.params.issueNumber);   
            if(!issue_id.data.length>0){
                return res.status(500).json({error: "Issue Number not found"}); 
            }           
            const text = req.body.text;
            
            const {data, err} = await comments.add(text, author.data[0]._id, issue_id.data[0]._id, req.params.issueNumber);            
            if(err){
                return res.status(500).json({err});
            } 
            if("error" in data){
                return res.status(500).json({error: data.error, comment: data.comment}); 
            } else {
                res.json({message: data.status, comment: data.comment}); 
            }
        } else {
            return res.status(500).json({error: "All fields are required"});
        } 
    }
    
    return {
        getController,
        postController,
        getByIssueNumber,
        getByAuthor,
        getById
    }
}