//importing models
const projects = require('../models/projects')();

module.exports = () => {
    //gets all docs
    const getController = async (req, res) => {
        const {data, err} = await projects.get();
        if(err){
            return res.status(500).json({err});
        }
        res.json({projects: data}); 
    }

    //gets all docs filtered by slug
    const getBySlug = async (req, res) => {  
        const {data, err} = await projects.get(req.params.slug);
        if(err){
            return res.status(500).json({err});
        }    
        res.json({projects: data}); 
    }

    //inserts a new document
    const postController = async (req, res) => {
        const slug = req.body.slug;
        const name = req.body.name;
        const description = req.body.description;
        if (slug && name && description){
            const {data, err} = await projects.add(slug, name, description);            
            if(err){
                return res.status(500).json({err});
            } 
            if("error" in data){
                res.json({error: data.error, project: data.project}); 
            }
            res.json({message: data.status, project: data.project}); 
        } else {
            return res.status(500).json({error: "All fields are required"});
        }        
    }
    
    return {
        getController,
        postController,
        getBySlug
    }
}