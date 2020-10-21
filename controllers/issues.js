const issues = require('../models/issues.js')();
const projects = require('../models/projects.js')();
module.exports = () => {
    const getController = async (req, res) => {
        res.json(await issues.get());
    }

    const getByIssueNumber = async (req, res) => {        
        res.json(await issues.get(req.params.issueNumber));
    }

    const getByProjectSlug = async (req, res) => { 
        const project = await projects.get(req.params.slug); 
        res.json(await issues.getByProjectId(project[0]._id));
    }

    const postController = async (req, res) => {
        const project = await projects.get(req.body.slug);
        const counter = await issues.count({"project_id":project[0]._id}) + 1; 
        const issueNumber = req.body.slug + "-" + counter;        
        const title = req.body.title;
        const description = req.body.description;
        const status = req.body.status;
        const result = await issues.add(issueNumber, title, description, status, project[0]._id);
        res.json(result);
    }
    
    return {
        getController,
        postController,
        getByIssueNumber,
        getByProjectSlug
    }
}