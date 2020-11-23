//importing models
const users = require('../models/users')();
const bcrypt = require('bcrypt');
const salt = 10;

module.exports = () => {
    //gets all docs
    const getController = async (req, res) => {
        const {data, err} = await users.get();
        if(err){
            return res.status(500).json({err});
        }
        res.json({users: data});         
    }

    //gets all docs filtered by name
    const getByEmail = async (req, res) => { 
        const {data, err} = await users.get(req.params.email);
        if(err){
            return res.status(500).json({err});
        }
        res.json({users: data});        
    }

    //inserts a document 
    const postController = async (req, res) => {    
        //hashing the key
        const hash = bcrypt.hashSync(req.body.key, salt);       
        const name = req.body.name;
        const email = req.body.email;
        const usertype = req.body.usertype;
        const key = hash;                
        if (name && email && usertype && req.body.key){
            const {data, err} = await users.add(name, email, usertype, key);            
            if(err){
                return res.status(500).json({err});
            } 
            if("error" in data){
                res.status(500).json({error: data.error, user: data.user}); 
            } else {
                res.json({message: data.status, user: data.user}); 
            }
        } else {
            return res.status(500).json({error: "All fields are required"});
        } 
    }

    //gets the key based on email and compares the hash
    const getByKey = async (key,email) => {
        if(!key){
            console.log("01: Missing key");
            return null;
        }
        const {data, err}  = await users.get(email);
        if(!err){           
            if(bcrypt.compareSync(key,data[0].key)){
                return data[0];
            } else {
                return null;
            }
        } else {        
            console.log("02: Bad Key");
            return null;
        }
    };   
    
    return {
        getController,
        postController,
        getByEmail,
        getByKey
    }
}