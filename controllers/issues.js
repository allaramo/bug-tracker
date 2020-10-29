//importing models
const issues = require('../models/issues')();
const projects = require('../models/projects')();

module.exports = () => {
    //gets all docs
    const getController = async (req, res) => {
        res.json(await issues.get());
    }

    //gets all docs filtered by issue number
    const getByIssueNumber = async (req, res) => {        
        res.json(await issues.get(req.params.issueNumber));
    }

    //gets all docs filtered by slug
    const getByProjectSlug = async (req, res) => { 
        //gets the project info of the slug sent
        const project = await projects.get(req.params.slug); 
        res.json(await issues.getByProjectId(project[0]._id));
    }

    //inserts a new document
    const postController = async (req, res) => {
        //gets the project info of the slug sent
        const project = await projects.get(req.params.slug);
        if(project.length>0){        
            //counts the issues of the same project id
            const counter = await issues.count({"project_id":project[0]._id}) + 1; 
            //creates the issue number using the slug sent
            const issueNumber = req.params.slug + "-" + counter;        
            const title = req.body.title;
            const description = req.body.description;
            const status = "todo";
            const result = await issues.add(issueNumber, title, description, status, project[0]._id);
            res.json(result);
        } else {
            res.json("Project not found")
        }
    }

    //updates the status of the document
    const putController = async (req, res) => {
        const issue = await issues.get(req.params.issueNumber);
        if(issue.length>0){
            const status = req.params.status;
            const result = await issues.edit(issue[0]._id, status);
            res.json(result);
        } else {
            res.json("Issue Number not found")
        }        
    }

    //aggregates comments to each issue
    const populatedController = async(req,res) => {
        const result = await issues.aggregateWithComments()
        res.json(result);
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