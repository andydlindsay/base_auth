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
PORT=8080
```
Put your newly created username and password into the fields above. In server.js, edit line 20 with the address of your database.  
Edit both package.json files as necessary.  
Edit angular-src/src/index.html as necessary.  
Edit the home and dashboard components as needed.  
The title that displays for each component can be edited in the following line (edit as needed):
```
this.titleService.setTitle('<title>');
```
The url's in angular-src/app/services/auth.service.ts have been made relative for ease of deploying to Heroku. If using a database on localhost, change the url's accordingly.

### Tests
The api's test folder contains a testing suite of 22 unit tests. With a local mongod instance running, use ``` npm test ``` to run the tests.  
The angular components login and register have 25 unit tests between them. From within the angular-src folder, run the tests with ``` ng test ```.

### Demo
A demo of this app is running on [Heroku](http://andydlindsay-baseauth.herokuapp.com).