The app uses the following:
* ReactJS
* Express.js

All the dependencies and scripts are mentioned in package.json file.
To run the app:

* npm install
    This should download all the dependencies.
* npm start
    This will run the express server
* npm run watch
    This will host the app.

Working Features
----------------
* Add task
* Delete task
* Add sub task
* Delete sub task
* Highlight missed task
* Show/Hide task description


testing scenarios
------------------------
* Place Holder text return on empty list
* Add task to empty list
* On checking main todo task, all subtasks are checked
* On checking all sub-tasks, main task gets checked
* Deleting task, deletes all sub-tasks
* Adding duplicate task preserves both tasks
* Deleting one of duplicate, preserve the other task.
* Cannot add a task due before current time.
