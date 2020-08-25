# Node JS

# Table of contents

- [Table of contents](#table-of-contents)
- [Bascis](#basics)
  - [Modules in Node](#modules-in-node)

# Basics
### Modules in Node

**- app.js**
```JavaScript
import largeNumber, {smallNumber} from 'module.js'
```
**- module.js**
```JavaScript
const largeNumber = 356;
const smallNumber = 1;

export default largeNumber;
export smallNumber;
```
