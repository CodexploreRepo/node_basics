# Node JS

# Table of contents

- [Table of contents](#table-of-contents)
- [Bascis](#basics)
  - [Modules in Node](#modules-in-node)
  - [Building a Server](#building-a-server)
- [Introduction to Express JS](#introduction-to-express-js)
- [Express Middleware](#express-middleware)

    

# Basics
### Modules in Node
-  **Common Node Modules** <br/>
    | Module   |      Command      |  Description |
    |----------|:-------------:|------|
    |package.json| npm init **-y**| to create package.json; -y flag to skip input
    |dev mod | npm install <module-name> **--save-dev**| to install module in devDependencies for deveploment only, not production|
    |||
    |express|npm install express| to 3rd party framework to build server, no need to use http module & DRY|
    | fs | require('fs')| to work with File System|
    | http|require('http')| to build the server|
    | nodemon| npm install nodemon | to auto reload the server when we make some changes in our code <br> "script" : {"start": "nodemon index.js"} so when we run npm start ~ npm nodemon index.js|
    | body-parser | included in Express |//Body-Parser middleware to parse the body of the request<br/> -app.use(express.urlencoded({ extended: false })); //to parse urlencoded<br> -app.use(express.json()); //to parse json |
    
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

### Building a Server
 
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

# Express Middleware

  ```JavaScript
  //Express Middleware: do smtg with request to make it easier to work with
  app.use((req, res, next) => {
    console.log("Middleware");
    //Do something here 
    next();
  });
  ```
