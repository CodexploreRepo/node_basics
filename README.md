# Node.js Study Guide

# Table of contents

- [Table of contents](#table-of-contents)
- [Bascis](#basics)
  - [Modules in Node](#modules-in-node)
  - [File System module in Node](#file-system-module-in-node)
  - [Environmental Variables](#environmental-variables)
  - [Storing User Passwords Securely](#storing-user-passwords-securely)
  - [Building a Server](#building-a-server)
- [Introduction to Express JS](#introduction-to-express-js)
  - [Building a Server via Express](#building-a-server-via-express)
  - [Loading Static Files](#loading-static-files)
- [Project Structure](#project-structure)
  - [Server.js](#server)
  - [App.js](#app)
  - [Routes Folder](#routes-folder)
  - [Controllers Folder](#controllers-folder)
- [Express Middleware](#express-middleware)
  - [Middleware Params](#middleware-params)
  - [Chaining Multiple Middlware Function](#chaining-multiple-middlware-function)
- [RESTful API](#restful-api)
  - [Request](#request)
  - [Response](#response)
  - [API - Get Request](#get-request)
  - [API - Post Request](#post-request)
  - [Refactoring APIs](#refactoring-api)
- [Cross-Origin Resource Sharing - CORS](#cors)
  - [What is CORS ?](#what-is-cors)
  - [CORS Request Types](#cors-request-types)
  - [Identifying a CORS Response](#Identifying-a-cors-response)
  - [How to Add CORS to a Nodejs Express App](#how-to-add-cors-to-a-nodejs-express-app)
- [Postman](#postman)
- [Database Connection](#database-connection)
  - [Mongo DB](#mongo-db)
    - [Mongo DB Connection via Express App](#mongo-db-connection-via-mongo-express-app)
    - [Mongo DB Connection via Mongo DB Compass app](#mongo-db-connection-via-mongo-db-compass-app)
    - [Mongo DB Connection via Mongo DB Shell](#mongo-db-connection-via-mongo-db-shell-app)
    - [Whitelist IPs to access DB](#whitelist-ips-to-access-db)
  - [Mongo DB CLI](#mongo-db-cli)
- [Production Deployment](#production-deployment)
  - [Back-End Heroku Deploy](#back-end-heroku-deploy)
  - [Database Heroku Connection](#database-heroku-connection)
  - [Front-End Heroku Deploy](#front-end-heroku-deploy)

# Basics

## Modules in Node

- **Common Node Modules** <br/>
  | Module | Command | Description |
  |----------|:-------------:|------|
  |package.json| npm init **-y**| to create package.json; -y flag to skip input
  |dev mod | npm install <module-name> **--save-dev**| to install module in devDependencies for deveploment only, not production|
  |||
  |express|npm install express| to 3rd party framework to build server, no need to use http module & DRY|
  | fs | require('fs')| to work with [File System](#file-system-module-in-node)|
  | http|require('http')| to build the server|
  | nodemon| npm install nodemon | to auto reload the server when we make some changes in our code <br> `"script" : {"start": "nodemon index.js"}` so when we run npm start ~ npm nodemon index.js|
  |morgan|require('morgan')|to log the API Request: `app.use(morgan("dev"));` <br>`GET /api/v1/tours 200 4.245 ms - 8618` |
  | body-parser | included in Express |Body-Parser middleware to parse the body of the request<br/>Otherwise, console.log(req.body) will return `undefined`<br/>How to use:<br> `app.use(express.urlencoded({ extended: false })); //to parse urlencoded`<br> `app.use(express.json()); //to parse json`|
  |dotenv| npm install dotenv | dotenv module: to read variables from the config.env file & save in Node.JS environment variables<br>`dotenv.config({ path: "./config.env" });`|
  |[bcrypt-nodejs](https://github.com/kelektiv/node.bcrypt.js)|npm install bcrypt-nodejs|allow us to create secure login via encrypt (hash) the password to hash<br>bcrypt is 15 years old and has been vetted by the crypto community.|
  |cors|npm install cors|An example of a cross-origin request: the front-end JavaScript code served from `https://domain-a.com` uses `XMLHttpRequest` to make a request for `https://domain-b.com/data.json`<br>How to add into Node JS Back-`const cors = require("cors");`<br>`app.use(cors());`|
  ||||
  |Knex| npm install knex|SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift |
  |PostgreSQL|npm install pg|Install Postg|
- **How to import/export a Node module:** <br/>

  - _Method 1 [New Way]:_ **import - export**<br/>

    **app.js**

    ```JavaScript
    import largeNumber, {smallNumber} from 'module.js'
    ```

    **module.js**

    ```JavaScript
    const largeNumber = 356;
    const smallNumber = 1;

    export default largeNumber;
    export smallNumber;
    ```

  - _Method 2 [Conventional Way]:_ **require - module.exports**<br/>
    **app.js**
    ```JavaScript 
    const c = require('./module.js'); 
    console.log(c.largeNumber); 
    ```
    
    **module.js**

    ```JavaScript
    const largeNumber = 356;

    module.exports = {
        largeNumber: largeNumber;
    }
    ```

[(Back to top)](#table-of-contents)

## File System module in Node

- **Usage**: I/O to read data from Excel files, to read from robot to get the data that robot detects

```JavaScript
const fs = require("fs");
```

- `__dirname` variable: presents current directory<br>

```JavaScript
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
```

### Read File

#### Async - readFile (Recommended for handling massive files when building Server)

- `Async readFile` starts by reading this `"./public/index.html"` file, and you can continue with other code
- Once done, the call back function `(err,data) => {...}` will perform the tasks, either give you `error` or `data`, inside that call back function

```JavaScript
fs.readFile("./public/index.html", (err, data) => {
  if (err) {
    console.log(err);
  }
  //Print out data from the file; .toString() to encode the data read
  console.log("Async", data.toString("utf-8"));
});
```

#### Sync - readFileSync

- `readFileSync`: going to read this `"./public/index.html"` file, so dont do anything (i.e: below code) until I fininsh reading the file & assign to `file` variable

```JavaScript
const file = fs.readFileSync("./public/index.html");
console.log("Sync", file.toString("utf-8"));
```

### Append File

```JavaScript
//APPEND
fs.appendFile("./hello.txt", "This is so cool!", (err) => {
  if (err) {
    console.log(err);
  }
});
```

### Write File

```JavaScript
//WRITE
fs.writeFile("bye.txt", "Sad to see you go", (err) => {
  if (err) {
    console.log(err);
  }
});
```

### Delete File

```JavaScript
//DELTE
fs.unlink("./bye.txt", (err) => {
  if (err) {
    console.log(err);
  }
});
```

[(Back to top)](#table-of-contents)

## Environmental Variables

Node allows to access Environmental Variables via `process.env`

```JavaScript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
```

- To inject the new Environmental Variables, like in this case is `PORT`, we need to open Bash Shell: Terminal > type "bash"

```
bash-3.2$ PORT=3050 node server.js
app is running on port 3050

```
- To create `config.env` to store all the Environmental Variables we want to inject to the Node.js app inside the `server` folder
  - `config.env` file
  ```
  NODE_ENV=development
  PORT=3000
  USERNAME=quannguyen
  PASSWORD=123456
  ```
  - To load all the Environmental Variables inside the  `config.env` file into the Node JS app, we need to use `dotenv` module & load inside the `server.js` file
  ```JavaScript
  //STARTING POINT
  const dotenv = require("dotenv");
  //dotenv module: to read variables from the config.env file &
  //save in Node.JS environment variables
  dotenv.config({ path: "./config.env" });
  // console.log(process.env);

  //Need to load ./config.env before the app.js so that any file can access all the Environmental Variables inside the  `config.env` via process.env 
  const app = require("./app");
  ```

[(Back to top)](#table-of-contents)

## Storing User Passwords Securely

- Hashing Function (like SHA256) + add a salt (randomly generated bytes to place in front of the password) for each user
- **Salt Rounds**: This is the cost factor that indicates the amount of time needed to calculate a single bcrypt hash. For example, a cost factor of n (`saltRounds = n`) means that the calculation will be done 2^n times.
  - add a saltRound (10 is the recommended value) which iterates 2^10, or 1024 times over the password in a process called **key stretching**.

```JavaScript
$ npm install bcrypt
/*
* You can copy and run the code below to play around with bcrypt
* However this is for demonstration purposes only. Use these concepts
* to adapt to your own project needs.
*/

import bcrypt from'bcrypt'
const saltRounds = 10 // increase this if you want more iterations
const userPassword = 'supersecretpassword'
const randomPassword = 'fakepassword'

const storeUserPassword = (password, salt) =>
  bcrypt.hash(password, salt).then(storeHashInDatabase)

const storeHashInDatabase = (hash) => {
   // Store the hash in your password DB
   return hash // For now we are returning the hash for testing at the bottom
}

// Returns true if user password is correct, returns false otherwise
const checkUserPassword = (enteredPassword, storedPasswordHash) =>
  bcrypt.compare(enteredPassword, storedPasswordHash)


// This is for demonstration purposes only.
storeUserPassword(userPassword, saltRounds)
  .then(hash =>
    // change param userPassword to randomPassword to get false
    checkUserPassword(userPassword, hash)
  )
  .then(console.log)
  .catch(console.error)

```

[(Back to top)](#table-of-contents)

## Building a Server

```JavaScript
const http = require("http");

const server = http.createServer((request, response) => {
  //Request
  console.log("headers", request.headers);
  console.log("method", request.method);
  console.log("url", request.url);

  //Response
  const user = {
    name: "CodeXplore",
    hobby: "Hello World",
  };

  response.setHeader("Content-Type", "application/json");

  //Since sending through server -> must be in JSON format
  response.end(JSON.stringify(user));
});

server.listen(3000);
```

[(Back to top)](#table-of-contents)

# Introduction to Express JS

- [Most Popular Back-End Framework Survey](https://2019.stateofjs.com/back-end/)

## Building a Server via Express

- Express is module to **build the server** instead of re-write the build server code again & again

```JavaScript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const user = {
    name: "CodeXplore",
    hobby: "Hello World",
  };

  res.send(user); //Express help to auto-JSON.stringify
});

app.listen(3000);
```

[(Back to top)](#table-of-contents)

## Loading Static Files

- Static Files: **index.htmls, css**
  - Step 1: Create a `public` folder in same directory with `server.js`
  - Step 2: In `server.js`, add this: `app.use(express.static(__dirname + "/public"));`

[(Back to top)](#table-of-contents)

# Project Structure
<img width="750" alt="Screenshot 2020-10-18 at 11 37 21 AM" src="https://user-images.githubusercontent.com/64508435/96358162-96275b80-1136-11eb-9f96-422427410e77.png">

## Server 
-  Creating a `server.js` file: This is the starting point of an Express App
```JavaScript
//STARTING POINT
const app = require("./app"); //Import App from app.js module

//#4 - START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App is running @ port ${port}...`);
});

```
## App
- In `app.js` file, the application is defined with
  - Middlware: which will be used by all the routes like express.json() parser 
  - Routers (For ex: tourRouter, userRouter): which basically APIs 
```JavaScript
const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

app = express();

//#1 - Middleware: added by using app.use()
app.use(morgan("dev")); //To log req/res info
app.use(express.json()); //express.json() is the middleware to parse the comming-in req.body to JavaScript Object

app.use((req, res, next) => {
  console.log("Hello From Middleware");
  next();
});

//#3 - ROUTES:
//Mouting the router
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//Export the app so that Server.js can access
module.exports = app;
```
## Routes Folder
- In this routes folder, we will define routers (For ex: `tourRouter.js, userRouter.js`)
- For each Router file, we will have differnet APIs -> call corresponding controllers to handle the API requests (like `GET, POST, PATCH, DELETE`)
```JavaScript
//User Router Example in userRouter.js
const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("./../controllers/userController");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
```
### Middleware Params
- Using the `router.param` to pass req.params to the middleware
- In `tourRouter.js` we have:
```JavaScript
const {
  checkId,
  ...
} = require("./../controllers/tourController");

//Middleware Params: to validate the "id" is valid or not
router.param("id", checkId);

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
```
- In `tourController.js`, we can write the middleware that can access `middleware params`:
  - `val` is equivalent to the value of req.params.
```JavaScript
exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};
```

## Controllers Folder
- In this routes folder, we will define controllers for each Router (For ex: `tourController.js, userController.js`)

```JavaScript
//Tour Controller Example in tourController.js
const fs = require("fs");

const toursFileName = `${__dirname}/../dev-data/data/tours-simple.json`;
//JSON parse is to converted JSON file to JavaScript Object
const tours = JSON.parse(fs.readFileSync(toursFileName));

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    //Give the users more understanding of API response
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours, //equivalent to tours: tours,
    },
  });
};

```


[(Back to top)](#table-of-contents)

# Express Middleware
![Screenshot 2020-10-15 at 11 39 29 PM](https://user-images.githubusercontent.com/64508435/96152946-af19ec00-0f3f-11eb-9788-90f8273760d2.png)

```JavaScript
//Express Middleware: do smtg with request to make it easier to work with
app.use((req, res, next) => {
  console.log("Middleware");
  //Do something here

  next();
});
```
## Chaining Multiple Middlware Function
- For example, we want to chain Middlware `checkBody` middlware before `createTour` controller to handle the incomming req.body
```JavaScript
router.route("/").post(checkBody, createTour);
```

# RESTful API

- Define a set of functions in the server (URL Param) which developer can perform the requests and receive the response from the server
- RESTFul means creating the rules that everybody agrees on the compatibity between systems
  - GET: receive the resource
  - PUT: update the resource
  - POST: create the resource
  - DELETE: remove the resource
- State-less: call can be made independently, and each call contains all necessary data to complete itself successfully
  - i.e: Server does not need to remember anything, each comming request has enough information that the server can response

## Request

| Type          |                                    Commands                                     | Description                        |
| ------------- | :-----------------------------------------------------------------------------: | ---------------------------------- |
| `req.query`   |                https://localhost:3000/ `?name=CodeXPlore&age=25`                | `{name: 'CodeXPlore', age: '25' }` |
| `req.body`    | **form-data**, **urlendcoded**, **raw-json**<br/>Please refer Postman/Body part |                                    |
| `req.headers` |           `Content-Type : application/json` <br> `name : CodeXplore`            |                                    |
| `req.params`  |    `app.get("/:id")`<br> `app.get("/:id/:optional?")`                           | ? = optional parameter             |

## Response

| Status Code   |                                     Definition                               | 
| ------------- | :----------------------------------------------------------------------------|
| 200 | OK or Updated OK |
| 201 | OK - Created|
| 204 | OK - Deleted| 
|||
|400| Bad Request|
|404| Not found|


- Res Header:

```Javascript
 res.writeHead(200, {
      "Content-type": "application/json", //Res to browser JSON Data
    });
```

- JSON : `res.json(user.entries)`
- Status: `res.status(200).send("Sending Res");`




## Get Request

```JavaScript
//Good Practice to Specify on API version on URL: /api/v1/
app.get("/api/v1/tours/:id", (req, res) => {
  // console.log(req.params);
  const id = req.params.id * 1; //convert req.params.id from String to Number
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  return res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});
```
## Post Request
- First, need to add `express.json` middleware in order to parse in-comming req.body into JavaScript Object
```JavaScript
//Middleware: added by using app.use()
//express.json() is the middleware to parse the comming-in req.body to JavaScript Object
app.use(express.json());
```
- Create a POST request:
```JavaScript

app.post("/api/v1/tours", (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(toursFileName, JSON.stringify(tours), (err) => {
    //201 = Created
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  });
});
```

## Refactoring API
```JavaScript
app
  .route("/api/v1/tours")
  .get(getAllTours)
  .post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

```

[(Back to top)](#table-of-contents)

# CORS

### What is CORS

- Thanks to the **same-origin policy** followed by `XMLHttpRequest` and `fetch`, JavaScript can only make calls to URLs that live on the same origin as the location where the script is running. For example, if a JavaScript app wishes to make an AJAX call to an API running on a different domain, it would be blocked from doing so thanks to the same-origin policy.

- **Cross-Origin Resource Sharing (CORS)** is a protocol that enables scripts running on a browser client to interact with resources from a different origin
  - For example, if you're running a React SPA running on http://localhost:3001 that makes calls to an API backend running on a different domain http://localhost:3000 (in this case different port 3001 & 3000)

### CORS Request Types

- There are _two types of CORS request_: "simple" requests, and "preflight" requests, and it's the browser that determines which is used.

  - **"Simple"** request:

    - One of these methods is used: `GET`, `POST`, or `HEAD`
    - Using the `Content-Type` header, only the following values are allowed: `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`

  - **"Preflight"** request:

    - If a request does not meet the criteria for a simple request, the browser will instead make an automatic preflight request using the `OPTIONS` method.
    - The preflight request sets the mode as `OPTIONS` and sets a couple of headers to describe the actual request that is to follow:

      - `Access-Control-Request-Method`: The intended method of the request (e.g., GET or POST)
      - `Access-Control-Request-Headers`: An indication of the custom headers that will be sent with the request
      - `Origin`: The usual origin header that contains the script's current origin

      - An example of such a request might look like this: This request basically says "I would like to make a `GET` request to localhost:3001/api/ping with the `Content-Type` and `Accept` headers from http://localhost:3000 - is that possible?".

      ```
      # Request
      curl -i -X OPTIONS localhost:3001/api/ping \
      -H 'Access-Control-Request-Method: GET' \
      -H 'Access-Control-Request-Headers: Content-Type, Accept' \
      -H 'Origin: http://localhost:3000'
      ```

### Identifying a CORS Response

- When a server has been configured correctly to allow cross-origin resource sharing, some special headers will be included.
- the primary one that determines who can access a resource is `Access-Control-Allow-Origin`

- So a response to the earlier example might look like this:
  ```
  HTTP/1.1 204 No Content
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
  Vary: Access-Control-Request-Headers
  Access-Control-Allow-Headers: Content-Type, Accept
  Content-Length: 0
  Date: Fri, 05 Apr 2019 11:41:08 GMT
  Connection: keep-alive
  ```
  - `Access-Control-Allow-Origin` header, in this case `*`, allows the request to be made from any origin.
  - `Access-Control-Allow-Methods` header describes only the accepted HTTP methods, in this case: `GET,HEAD,PUT,PATCH,POST,DELETE`

### How to Add CORS to a Nodejs Express App

```JavaScript
//In server.js file of Express:

const cors = require("cors"); // bring in the cors library

//replace custom middleware with the cors() middleware
app.use(cors());
```

- As an example of how to do this, you can reconfigure the CORS middleware to only accept requests from the origin that the frontend is running on. Modify the cors() setup from the previous example to look like the following:

```JavaScript
app.use(
 cors({
   origin: "http://localhost:3000", // restrict calls to those this address
   methods: "GET" // only allow GET requests
 })
);
```

[(Back to top)](#table-of-contents)

# Postman

### Body

- **form-data**: similar to form submit in Front-End with Key-Value pair
- **x-www-form-urlendcoded**: similar to form submit in Front-End with Key-Value pair
- **raw**: select JSON

  [(Back to top)](#table-of-contents)

# Database Connection
## Mongo DB
- Step 1: Create a new project in Atlas > create a new Cluster
- Step 2: Click on Connect > Add IP Address to the White List > Create a New Username > 
Add the Username's password in the `config.env` file in the app
```
DATABASE=mongodb+srv://quannguyen:<PASSWORD>@cluster0.bl9br.mongodb.net/natours?retryWrites=true&w=majority
DATABASE_PASSWORD=GLQd35jv8ZvBpohF
```

### Mongo DB Connection via Express App
- Step 3: Select "Choose a connection Method" > "Connect with your application"
### Mongo DB Connection via Mongo DB Compass app
<img width="500" alt="Screenshot 2020-11-01 at 9 53 55 PM" src="https://user-images.githubusercontent.com/64508435/97804781-f537b500-1c8c-11eb-9111-03edadb9cb15.png">
- Step 3: Select "Choose a connection Method" > "Connect with MongoDB Compass" > "I have Commpass" > "Copy the connection string, then open MongoDB Compass."
- Step 4: Open the MongoDB Compass app > Click connect & Enter the connection String with Password replaced.
```
mongodb+srv://quannguyen:<password>@cluster0.bl9br.mongodb.net/natours
```
<img width="1006" alt="Screenshot 2020-11-01 at 10 22 34 PM" src="https://user-images.githubusercontent.com/64508435/97805441-1dc1ae00-1c91-11eb-8f9a-c7485baae551.png">

### Mongo DB Connection via Mongo DB Shell
- Step 3: Install Mongo Shell (Not required if already installed)
- Step 4: your connection string in your command line

### Whitelist IPs to access DB

- Step 5 [Optional]: Allow access to all IPs (WhiteList) to access the database
  - Cluster > Network Access > Add IP Address > Allows All
<img width="1409" alt="Screenshot 2020-11-01 at 10 29 38 PM" src="https://user-images.githubusercontent.com/64508435/97805557-d1c33900-1c91-11eb-928f-efa091553701.png">

## Mongo DB CLI

  | Step |       Command        | Description                                                      |
  | ---- | :------------------: | ---------------------------------------------------------------- |
  | 1    |   `show dbs`         | to show all available databases                                  |
  | 2    |   `use db_name`      | to use/switch to the database db_name                            |
  | 3    |   `db.tours.find()`  | to list down all elements in `tours` collection                  |

# Production Deployment

How to deploy the full-stack application below to Production ?
![Screenshot 2020-09-26 at 12 53 00 PM](https://user-images.githubusercontent.com/64508435/94330453-77321f80-fff7-11ea-9fed-045160d9a132.png)

### Back-End Heroku Deploy

In package.json: On Heroku, dev dependencies never get installed => need to modify start script

- In Heroku, npm start runs by default and loads server.js from a normal node command
- Locally, just run in your terminal `npm run start:dev`

```JavaScript
"scripts": {
    "start": "node server.js",
    "start:dev": "nodemon server.js"
    .....
  },
```

- [Step 1]: Login to Heroku Web => Create an app "project-name-back-end-app"
- [Step 2]: Go to Terminal @ Back-End Folder
  If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

```
$ heroku login
```

Clone the repository
Use Git to clone smart-brain-codexplore's source code to your local machine.

```
$ heroku git:clone -a project-name-back-end-app
```

Check if git origin move to heroku

```
git remote -v

heroku  https://git.heroku.com/project-name-back-end-app.git (fetch)
heroku  https://git.heroku.com/project-name-back-end-app.git (push)
```

```
cd back-end
git init

git add .
git commit -m "my First Commit"

#Push the App to Heroku Server
git push heroku master
```

Once the App is uploaded, there is the new Back-End link: https://project-name-back-end-app.herokuapp.com
--> NEED to CHANGE all `fetch(http://localhost:3000)` in Front-End app to `fetch(https://project-name-back-end-app.herokuapp.com)`

### Database Heroku Connection

- [Step 1]: Select Database > create Postgre DB > Install Heroku Postgres with Back-End app
- [Step 2]: Go to Terminal @ Back-End Folder

  | Step |       Command        | Description                                                      |
  | ---- | :------------------: | ---------------------------------------------------------------- |
  | 1    |   `heroku addons`    | to add the **heroku-postgresql** database to the                 |
  | 2    |   `heroku pg:info`   | Check the info of the DB to modify `Back-End Knex` DB Connection |
  | 3    |   `heroku pg:psql`   | To access PSQL DB to create Tables                               |
  | 4    | `heroku logs --tail` | Check Server log                                                 |
  | 5    |   `heroku config`    | To check the `DATABASE_URL`                                      |

```
--Create "Users" Table
CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR(100),
    email text UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0,
    joined TIMESTAMP NOT NULL
);
--Create "Login" Table
CREATE TABLE login (
    id serial PRIMARY KEY,
    hash VARCHAR(100) NOT NULL,
    email text UNIQUE NOT NULL
);
```

- [Step 3] Modify `DB Knex` connection in Back-end `server.js` file

```JavaScript

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;   //Need to modify like this to use Free DB on Heroku
const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL, //DATABASE_URL will be in the Environment Variable on Heroku
    //Need to modify like this to use Free DB on Heroku
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
```

### Front-End Heroku Deploy

- [Step 1] To avoid any errors when deploying to Heroku (some students have mentioned that their deployment fails because of a certain version of create react app that they are using), there is a way to make sure your deployment succeeds.

```
npm install serve --s
```

Replace the npm start command in `package.json` of Front-End folder like this:

```JavaScript
"scripts": {
    "start": "serve -s build",
    // it used to be like this, which you can remove now:
    // "start": "react-scripts start",
```

- [Step 2]: Login to Heroku Web => Create an app "project-name-front-end-app"
- [Step 3]: Go to Terminal @ Back-End Folder
  If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

```
$ heroku login
```

Clone the repository
Use Git to clone smart-brain-codexplore's source code to your local machine.

```
$ heroku git:clone -a project-name-front-end-app
```

Check if git origin move to heroku

```
git remote -v

heroku  https://git.heroku.com/project-name-front-end-app.git (fetch)
heroku  https://git.heroku.com/project-name-front-end-app.git (push)
```

```
cd back-end
git init

git add .
git commit -m "my First Commit"

#Push the App to Heroku Server
git push heroku master
```

[(Back to top)](#table-of-contents)
