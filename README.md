# Basic Authentication App
#### Built using Angular and Node, this app provides basic user registration, log in and out functionality, and protected routes.

### Usage
Clone this repo
```
$ git clone https://github.com/andydlindsay/base_auth.git
```
Create a MongoDB deployment on [mlab.com](https://mlab.com) and create a new user for the database. In the root directory of the application, create a file called .env and put in the following:
```
DB_USER=<db_username>
DB_PASSWORD=<db_password>
```
Put your newly created username and password into the fields above.  
In server.js, edit line 20 with the address of your database.  
Edit both package.json files as necessary.  
Edit angular-src/src/index.html as necessary.  
Edit the home and dashboard components as needed.  
The title that displays for each component can be edited in the following line (edit as needed):
```
this.titleService.setTitle('<title>');
```
The url's in angular-src/app/services/auth.service.ts have been made relative for ease of deploying to Heroku. If using a database on localhost, change the url's accordingly.

### Tests
The api's test folder contains a testing suite of 22 unit tests. With a local mongod instance running, use ``` npm test ``` or ```gulp test``` to run the tests.  
The angular login and regiser components have 25 unit tests between them. From within the angular-src folder, run the tests with ``` ng test ```.

### Deploying to Heroku
From within the angular-src folder, run ``` ng build --prod ```.  
In the root directory, run the following lines of code:
```
$ heroku create <name-of-app>
$ heroku git:remote -a <name-of-app>
$ git push heroku master
```
The first line creates a named Heroku app. The other two lines create a remote and push the master branch to it. The app will automatically build and deploy on Heroku. [More info.](https://devcenter.heroku.com/articles/git#deploying-code)  
Vist your Heroku [dashboard](https://dashboard.heroku.com/apps) and, under the Settings tab, set the config variables ```DB_PASSWORD``` and ```DB_USER``` to the values in the .env file. [More info.](https://devcenter.heroku.com/articles/config-vars)

### Demo
A demo of this app is running on [Heroku](http://andydlindsay-baseauth.herokuapp.com).

### More information on the technologies used to build this app
[MongoDB](https://docs.mongodb.com/manual/),  
[Mongoose](http://mongoosejs.com/docs/guide.html), 
[Node](https://nodejs.org/en/docs/), and 
[Express](https://expressjs.com/en/guide/routing.html), 
[Passport](http://passportjs.org).  
[Gulp](https://github.com/gulpjs/gulp/blob/master/docs/API.md), 
[Chai](http://chaijs.com/guide/), and 
[Mocha](https://mochajs.org).  
[Angular](https://angular.io/docs/ts/latest/), 
[Material 2](https://material.angular.io/guide/getting-started), 
[Karma](https://karma-runner.github.io/1.0/index.html), and 
[Jasmine](https://jasmine.github.io/2.4/introduction.html).