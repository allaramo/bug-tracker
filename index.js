/*
** Alan Arango
** 2020075
** Bug Tracker
*/

//importing express and body parser
const express = require('express');
const bodyParser = require('body-parser');

//setting hostname and port
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

//importing controllers for each model
const projectsController = require('./controllers/projects')();
const usersController = require('./controllers/users')();
const issuesController = require('./controllers/issues')();
const commentsController = require('./controllers/comments')();

//using express and body parser. Printing on log each method required
const app = module.exports = express();
app.use((req,res,next) => { 
    console.log('[%s] %s -- %s', new Date(), req.method, req.url);
    next();
});
app.use(bodyParser.json());
/*
//authentication x-api-key and x-api-email
app.use(async (req,res,next)=>{
    const FailedAuthMessage = {
        error: "Failed Authentication",
        message: "Try again",
        code: "xxx"
    }
    const suppliedKey = req.headers["x-api-key"];
    const suppliedEmail = req.headers["x-api-email"];
    const clientIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if(!suppliedKey || !suppliedEmail){        
        console.log(
            "[%s] FAILED AUTHENTICATION -- %s, No Key or Email Supplied", 
            new Date(), 
            clientIp
        );
        FailedAuthMessage.code = "01";
        return res.status(401).json(FailedAuthMessage);
    }
    const user = await usersController.getByKey(suppliedKey,suppliedEmail);
    if(!user){
        console.log(
            "[%s] FAILED AUTHENTICATION -- %s, Bad Key or Email Supplied", 
            new Date(), 
            clientIp
        );
        FailedAuthMessage.code = "02";
        return res.status(401).json(FailedAuthMessage);
    }
    next();
});*/

//ROUTES
//PROJECT routes
//get all projects
app.get('/projects', projectsController.getController);
//get an individual project by slug
app.get('/projects/:slug', projectsController.getBySlug);
//add a new project
app.post('/projects', projectsController.postController);

//USER routes
//get all users
app.get('/users', usersController.getController);
//get an individual user by email
app.get('/users/:email', usersController.getByEmail);
//add a new user
app.post('/users', usersController.postController);

//ISSUES routes
//get all issues without comments
app.get('/issues-only', issuesController.getController);
//get all issues with comments
app.get('/issues', issuesController.populatedController);
//get an individual issue by its issue number
app.get('/issues/:issueNumber', issuesController.getByIssueNumber);
//get all issues for a project
app.get('/projects/:slug/issues', issuesController.getByProjectSlug);
//updates issue's status
app.put('/projects/:slug/issues/:issueNumber/:status', issuesController.putController);
//add a new issue to a project
app.post('/projects/:slug/issues', issuesController.postController);

//COMMENTS routes
//get all comments
app.get('/comments', commentsController.getController);
//get all comments for an author
app.get('/comments/:author', commentsController.getByAuthor);
//get all comments for an issue
app.get('/issues/:issueNumber/comments', commentsController.getByIssueNumber);
//get individual comment for an issue
app.get('/issues/:issueNumber/comments/:id', commentsController.getById);
//add a bew comment to an issue
app.post('/issues/:issueNumber/comments', commentsController.postController);

//starting server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
}); 
 


