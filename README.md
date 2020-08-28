# Node.js 

# Table of contents

- [Table of contents](#table-of-contents)
- [Bascis](#basics)
  - [Modules in Node](#modules-in-node)
  - [File System module in Node](#file-system-module-in-node)
  - [Building a Server](#building-a-server)
- [Introduction to Express JS](#introduction-to-express-js)
  - [Building a Server via Express](#building-a-server-via-express)
  - [Loading Static Files](#loading-static-files)
- [Express Middleware](#express-middleware)
- [RESTful API](#restful-api)
  - [Request](#request)
  - [Response](#response)
- [Postman](#postman)
  

# Basics
## Modules in Node
-  **Common Node Modules** <br/>
    | Module   |      Command      |  Description |
    |----------|:-------------:|------|
    |package.json| npm init **-y**| to create package.json; -y flag to skip input
    |dev mod | npm install <module-name> **--save-dev**| to install module in devDependencies for deveploment only, not production|
    |||
    |express|npm install express| to 3rd party framework to build server, no need to use http module & DRY|
    | fs | require('fs')| to work with File System|
    | http|require('http')| to build the server|
    | nodemon| npm install nodemon | to auto reload the server when we make some changes in our code <br> `"script" : {"start": "nodemon index.js"}` so when we run npm start ~ npm nodemon index.js|
    | body-parser | included in Express |Body-Parser middleware to parse the body of the request<br/>Otherwise, console.log(req.body) will return `undefined`<br/>How to use:<br> `app.use(express.urlencoded({ extended: false })); //to parse urlencoded`<br> `app.use(express.json()); //to parse json`|
    
-  **How to import/export a Node module:** <br/>
    - *Method 1 [New Way]:* **import - export**<br/>
    
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
    - *Method 2 [Conventional Way]:* **require - modules.export**<br/>
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


# Express Middleware

  ```JavaScript
  //Express Middleware: do smtg with request to make it easier to work with
  app.use((req, res, next) => {
    console.log("Middleware");
    //Do something here 
    
    next();
  });
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

   | Type   |     Commands      |  Description |
   |----------|:-------------:|------|
   |`req.query`| https://localhost:3000/ `?name=CodeXPlore&age=25` | `{name: 'CodeXPlore', age: '25' }`|
   |`req.body`| **form-data**, **urlendcoded**, **raw-json**<br/>Please refer Postman/Body part||
   |`req.headers`| `Content-Type : application/json` <br> `name : CodeXplore` | |
   |`req.params`| `app.get("/:id")` | |

## Response
- JSON  : `res.json(user.entries)`
- Status: `res.status(200).send("Sending Res");`

# Postman
### Body
- **form-data**: similar to form submit in Front-End with Key-Value pair
- **x-www-form-urlendcoded**: similar to form submit in Front-End with Key-Value pair
- **raw**: select JSON

   [(Back to top)](#table-of-contents)
