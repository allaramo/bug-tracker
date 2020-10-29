# bug-tracker

How to use Bug Tracker:

## Routes:

Examples for Project with Slug=BUG

If you want to list all projects use:
/projects

If you want to look for an specific project use:
/projects/slug=BUG

If you want to insert a project use POST and use:
/projects

If you want to list all users use:
/users

If you want to look for an specific user use:
/users/name=allaramo

If you want to insert a user use POST and use:
/users

If you want to list all issues without comments use:
/issues

If you want to list all issues with their respective comments use:
/issues/populated

If you want to look for an specific issue you can use:
/issues/issueNumber=BUG-1

If you want to look all the issues for a specific project use:
/issues/slug=BUG

If you want to insert an issue use POST and use:
/issues

If you want to edit the issue use PUT and use:
/issues/issueNumber=BUG-1

If you want to list all comments of all issues use:
/issues/comments

If you want to list all comments of a specific issue use:
/issues/comments/issueNumber=BUG-1

If you want to list all comments of a specific user use:
/issues/comments/author=allaramo

If you want to insert a new comment use POST and use:
/issues/comments