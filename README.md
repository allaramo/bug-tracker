# bug-tracker

Bug Tracker allows you to manage issues in your projects. By using this system you will be able to add as many projects you are developing and also add for each project issues related to bugs that should be fixed or new features to be added. Each user can add issues to a project, update the status of these issues and add comments related to them.

## Table of Contents
* [What does bug tracker do](#what-does-bug-tracker-do)
* [How to set it up](#how-to-set-it-up)
* [Technologies used](#technologies-used)
* [Routes](#routes)
* [Changelog](#changelog)
* [Roadmap](#roadmap)
* [Author](#author)

## What does bug tracker do
Bug tracker allows users to add project. Each project can have one or more issues. Issues represent bugs, errors, features to add, or other concern related to the project. Each issue has one status, being the status "open" one of the inital status that can be used. Other status can be "wip", "blocked" and "closed". However, the system allows to create more status if needed. Once an issue is created, users can add comments related to that issue in order to solve it. Email notifications will be sent to every Administrator when a new project, user, issue and comment is created.

## How to set it up
1. Clone the project running the following command:
```ruby
$ git clone https://github.com/allaramo/bug-tracker
```

2. Install the dependencies with the following command:
```ruby
$ npm install
```
The following dependencies should be installed:
"bcrypt": used for password encryption
"body-parser": used for parsing the incoming request bodies
"express": used for the server-side logic
"mongodb": used for the non-sql database

3. Create your own cluster using [Mongo-Atlas](https://www.mongodb.com/cloud/atlas)

4. Get the connection link from your cluster

5. Insert an admin user to the database collection User, using the fields: name, email, usertype [admin, user] and key.

6. Configure a Variable named MONGO_URI with the connection link and run the application
```ruby
$ MONGO_URI="mongodb+srv://<user>:<password>@<clustername>.mongodb.net/?retryWrites=true&w=majority" npm start
```

## Technologies Used
* NodeJS
* Express
* MongoDB
* Bcrypt

## Routes

0. API-KEY
For all the routes an x-api-key and x-api-email are required as headers. You can use the following api key: 123456 and any email added in the User model to access the routes.


1. Users

* To get all users use:
http://localhost:3000/users

* To get a user by its Slug:
http://localhost:3000/users/<email>

* To add a new user with the fields name, email, usertype[admin or user] and key do a POST to: 
http://localhost:3000/users

2. Projects

* To get all projects use:
http://localhost:3000/projects

* To get a project by its Slug:
http://localhost:3000/projects/<nameofslug>

* To add a new project with the fields slug, name and description do a POST to: 
http://localhost:3000/projects

3. Issues

* To get all issues without comments use:
http://localhost:3000/issues-only

* To get all issues with their comments use:
http://localhost:3000/issues

* To get an issue by its issue number use:
http://localhost:3000/issues/<issueNumber>

* To get all issues of a specific project use:
http://localhost:3000/projects/<slug>/issues

* To update the status of an issue do a PUT to: 
http://localhost:3000/projects/<slug>/issues/<issueNumber>/<newStatus>

* To add an issue to a project with the fields title, description and status do a POST to: 
http://localhost:3000/projects/<slug>/issues

4. Comments

* To get all comments use:
http://localhost:3000/comments

* To get all comments of an specific author use:
http://localhost:3000/comments/<email>

* To get all comments of an specific issue use:
http://localhost:3000/issues/<issueNumber>/comments

* To get an individual comment of an specific issue use:
http://localhost:3000/issues/<issueNumber>/comments/<commentId>

* To add a new comment with the fields text, author do a POST to: 
http://localhost:3000/issues/<issueNumber>/comments

## Changelog

* 23 November 2020 Docker image was created. Available in [Docker Hub](https://hub.docker.com/r/allaramo/bugtracker)
* 23 November 2020 NodeMailer Notifications to Admins
* 21 November 2020 Readme modified
* 15 November 2020 Finished Error Checking. Users and slugs cannot be repeated. All fields are required in POST actions. Added Try/Catch to all promises.

## Roadmap

* Initial Front-End for all routes
* Login screen with email and password for authentication
* Add issues linking and due dates for issues

## Author

Alan Arango started his journey in software and web development since 2007. Currently he is studying a Higher Diploma in Science in Computing at CCT. He also has a Masters in Business Administration and a Bachelor's Degree in System's Engineering. He worked for many years in the country he was born, Guatemala, in the specific areas of Software Development and Business Intelligence. Coding and data are two of his passions and the integration between IT and Businesses Processes are one of its main interests.

