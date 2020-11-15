//importing db and defining collection to be used
const db = require('../db')();
const COLLECTION = "issues";

//creating pipeline
//code based on class exercises and adapted from the solution given in:
//Stackoverflow (2017). MongoDB nested lookup with 3 child levels [online]
//Available from: https://stackoverflow.com/questions/45038087/mongodb-nested-lookup-with-3-child-levels
//[accessed 22 October 2020]
const LOOKUP_PIPELINE= [
    {$lookup: {
        from: "projects",
        localField: "project_id",
        foreignField: "_id",
        as: "project"
    }},
    {$lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'issue_id',
        as: 'comments'
    }},
    {$unwind: {
        path: "$comments",
        preserveNullAndEmptyArrays: true
    }},
    {$lookup: {
        from: 'users',
        localField: 'comments.author',
        foreignField: '_id',
        as: 'author'
    }},    
    {$group: {
        _id: '$_id',
        issueNumber: {$first: '$issueNumber'},
        title: {$first: '$title'},
        description: {$first: '$description'},
        status: {$first: '$status'},
        project: {$first: '$project'},
        comments: {$push: {
            _id: '$comments._id',
            text: '$comments.text',
            author: '$author'
        }}
    }}
];

module.exports = () => {
    //gets docs filtered by issueNumber if specified otherwise gets all docs in collection
    const get = async (issueNumber=null) => {  
        try{           
            if(!issueNumber){
                const results = await db.get(COLLECTION);
                return {data: results};  
            }
            const results = await db.get(COLLECTION,{issueNumber});
            return {data: results};  
        } catch (ex) {
            return { error: ex }
        }
    }

    //gets all docs filtered by project id
    const getByProjectId = async (project_id=null) => {    
        try{        
            const results = await db.get(COLLECTION,{project_id});
            return {data: results}; 
        } catch (ex) {
            return { error: ex }
        }
    }
    
    //adds to collection
    const add = async (issueNumber, title, description, status, project_id) => {        
        try{
            const results = await db.add(COLLECTION,{
                issueNumber: issueNumber, 
                title: title,
                description: description,
                status: status,
                project_id: project_id 
            });
            return {data: {status: "Data added successfully", project: results.ops}}; 
        } catch (ex) {
            return { error: ex }
        } 
    }

    //counts how many docs are in the collection filtered by a query
    const count = async(query) => {
        try{
            const counter = await db.count(COLLECTION,query);        
            return counter;
        } catch (ex) {
            return { error: ex }
        }
    }

    //updates the status of the issue id given
    const edit = async (issue_id, status) => {
        try{
            const results = await db.edit(COLLECTION,{"_id":issue_id},{"status":status})
            return {data: {status: "Data updated successfully", project: results.ops}}; 
        } catch (ex) {
            return { error: ex }
        }
    }

    //gets the issues with their comments aggregated 
    const aggregateWithComments = async () => {
        try{
            const results = await db.aggregate(COLLECTION, LOOKUP_PIPELINE);
            return {data: results}; 
        } catch (ex) {
            return { error: ex }
        }
    }

    return {
        get,
        add,
        count,
        getByProjectId,
        edit,
        aggregateWithComments
    }
};