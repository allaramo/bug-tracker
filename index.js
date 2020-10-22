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

//Routes
//project routes
app.get('/projects', projectsController.getController);
app.get('/projects/slug=:slug', projectsController.getBySlug);
app.post('/projects', projectsController.postController);
//user routes
app.get('/users', usersController.getController);
app.get('/users/name=:name', usersController.getByName);
app.post('/users', usersController.postController);
//issues routes
app.get('/issues', issuesController.getController);
app.get('/issues/populated', issuesController.populatedController);
app.get('/issues/issueNumber=:issueNumber', issuesController.getByIssueNumber);
app.get('/issues/slug=:slug', issuesController.getByProjectSlug);
app.post('/issues', issuesController.postController);
//edits issue's status
app.put('/issues/issueNumber=:issueNumber', issuesController.putController);
//comments routes
app.get('/issues/comments', commentsController.getController);
app.get('/issues/comments/issueNumber=:issueNumber', commentsController.getByIssueNumber);
app.get('/issues/comments/author=:author', commentsController.getByAuthor);
app.post('/issues/comments', commentsController.postController);

//starting server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
}); 
 


