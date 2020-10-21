const express = require('express');
const bodyParser = require('body-parser');
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;
const projectsController = require('./controllers/projects')();
const usersController = require('./controllers/users')();
const issuesController = require('./controllers/issues')();

const app = module.exports = express();
app.use((req,res,next) => { 
    console.log('[%s] %s -- %s', new Date(), req.method, req.url);
    next();
});

app.use(bodyParser.json());

app.get('/projects', projectsController.getController);
app.get('/projects/:slug', projectsController.getBySlug);
app.post('/projects', projectsController.postController);
app.get('/users', usersController.getController);
app.get('/users/:name', usersController.getByName);
app.post('/users', usersController.postController);
app.get('/issues', issuesController.getController);
app.get('/issues/:issueNumber', issuesController.getByIssueNumber);
app.get('/issues/slug/:slug', issuesController.getByProjectSlug);
app.post('/issues', issuesController.postController);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
}); 
 


