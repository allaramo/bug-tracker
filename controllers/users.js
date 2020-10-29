//importing models
const users = require('../models/users')();
const bcrypt = require('bcrypt');
const salt = 10;

module.exports = () => {
    //gets all docs
    const getController = async (req, res) => {
        res.json(await users.get());
    }

    //gets all docs filtered by name
    const getByEmail = async (req, res) => {        
        res.json(await users.get(req.params.email));
    }

    //inserts a document 
    const postController = async (req, res) => {    

        const hash = bcrypt.hashSync(req.body.key, salt);       
        const name = req.body.name;
        const email = req.body.email;
        const usertype = req.body.usertype;
        const key = hash;
        const result = await users.add(name, email, usertype, key);                   
        res.json(result);
    }
    
    return {
        getController,
        postController,
        getByEmail
    }
}