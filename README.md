# Node JS

# Table of contents

- [Table of contents](#table-of-contents)
- [Bascis](#basics)
  - [Modules in Node](#modules-in-node)

# Basics
### Modules in Node
-  **How to import/export a Node module:** <br/>
    - Method 1 (New Way): import - export
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
    - Method 2 (Conventional Way): require - modules.export
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
