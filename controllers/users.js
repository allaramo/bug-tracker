//importing models
const users = require('../models/users')();

module.exports = () => {
    //gets all docs
    const getController = async (req, res) => {
        res.json(await users.get());
    }

    //gets all docs filtered by name
    const getByName = async (req, res) => {        
        res.json(await users.get(req.params.name));
    }

    //inserts a document 
    const postController = async (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const usertype = req.body.usertype;
        const result = await users.add(name, email, usertype);
        res.json(result);
    }
    
    return {
        getController,
        postController,
        getByName
    }
}