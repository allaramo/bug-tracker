//importing models
const issues = require('../models/issues')();
const projects = require('../models/projects')();

module.exports = () => {
    //gets all docs
    const getController = async (req, res) => {        
        const {data, err} = await issues.get();
        if(err){
            return res.status(500).json({err});
        }
        res.json({issues: data}); 
    }

    //gets all docs filtered by issue number
    const getByIssueNumber = async (req, res) => {       
        const {data, err} = await issues.get(req.params.issueNumber);
        if(err){
            return res.status(500).json({err});
        }
        res.json({issues: data}); 
    }

    //gets all docs filtered by slug
    const getByProjectSlug = async (req, res) => { 
        //gets the project info of the slug sent
        const {project, errP} = await projects.get(req.params.slug);
        if(errP){
            return res.status(500).json({errP});
        }
        const {data, err} = await issues.getByProjectId(project[0]._id);
        if(err){
            return res.status(500).json({err});
        }
        res.json({issues: data}); 
    }

    //inserts a new document
    const postController = async (req, res) => {
        //gets the project info of the slug sent        
        const project = await projects.get(req.params.slug); 
        if(project.data.length>0){        
            //counts the issues of the same project id
            const counter = await issues.count({"project_id":project.data[0]._id}) + 1; 
            //creates the issue number using the slug sent
            const issueNumber = req.params.slug + "-" + counter;        
            const title = req.body.title;
            const description = req.body.description;
            const status = "todo";
            if (title && description){
                const {data, err} = await issues.add(issueNumber, title, description, status, project.data[0]._id);          
                if(err){
                    return res.status(500).json({err});
                } 
                if("error" in data){
                    res.json({error: data.error, issue: title}); 
                } else {
                    res.json({message: data.status, issue: data.issue}); 
                }
            } else {
                return res.status(500).json({error: "All fields are required"});
            }   
        } else {
            return res.status(500).json({error: "Project not found"});            
        }
    }

    //updates the status of the document
    const putController = async (req, res) => {
        const issue = await issues.get(req.params.issueNumber);
        if(issue.data.length>0){
            const status = req.params.status;
            if(status){
                const {data, err} = await issues.edit(issue.data[0]._id, status, issue.data[0].issueNumber);
                if(err){
                    return res.status(500).json({err});
                } 
                if("error" in data){
                    res.status(500).json({error: data.error, issue: title}); 
                } else {
                    res.json({message: data.status, issue: data.issue}); 
                }
            } else {
                return res.status(500).json({error: "New Status is required"});
            }         
        } else {
            return res.status(500).json({error: "Issue Number not found"}); 
        }        
    }

    //aggregates comments to each issue
    const populatedController = async(req,res) => {       
        const {data, err} = await issues.aggregateWithComments();
        if(err){
            return res.status(500).json({err});
        }
        res.json({issues: data}); 
    }    
    
    return {
        getController,
        postController,
        getByIssueNumber,
        getByProjectSlug,
        putController,
        populatedController
    }
}