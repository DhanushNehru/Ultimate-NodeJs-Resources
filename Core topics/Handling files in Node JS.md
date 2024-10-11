# Handling files in Node JS

### To handle the files we have to use the `fs` module.

The `fs` module is powerful and essential for handling file-related tasks in Node.js, making it a key tool for any server-side application.

To import `fs` module:

```jsx
const fs = require('fs');
```

There are two types of methods:

1. **Synchronous Methods**: These methods block the execution of your code until the operation is complete. They are easier to understand but can slow down your application if used excessively.
2. **Asynchronous Methods**: This allows your program to continue executing while the file operation is performed in the background. They use callbacks or Promises to handle the result.

### **Commonly used functions:**

1. Reading Files:
    
    ```jsx
     // Asynchronous:
     const fs = require('fs');
    
     fs.readFile('example.txt', 'utf8', (err, data) => {
         if (err) {
             console.error(err);
             return;
         }
         console.log(data);
     });
    
    ```
    
    `fs.readFile` reads the contents of a file asynchronously. The callback is called with an error (if any) and the data from the file.
    
    ```jsx
     // Synchronous:
     const fs = require('fs');
    
     try {
         const data = fs.readFileSync('example.txt', 'utf8');
         console.log(data);
     } catch (err) {
         console.error(err);
     }
    
    ```
    
    `fs.readFileSync` reads the file synchronously and returns the data directly. If an error occurs, it must be caught using `try-catch`.
    
2. **Writing Files**:
    
    ```jsx
     // Asynchronous:
     const fs = require('fs');
    
     const content = 'This is some content';
    
     fs.writeFile('example.txt', content, err => {
         if (err) {
             console.error(err);
             return;
         }
         console.log('File written successfully');
     });
    ```
    
    - `fs.writeFile` writes data to a file asynchronously. If the file does not exist, it is created. The callback is executed after the file is written.
    
    ```jsx
    // Synchronous:
        const fs = require('fs');
    
        const content = 'This is some content';
    
        try {
            fs.writeFileSync('example.txt', content);
            console.log('File written successfully');
        } catch (err) {
            console.error(err);
        }
    ```
    
    `fs.writeFileSync` writes data to a file synchronously. It blocks the code execution until the operation is complete.
    

1. **Appending to Files**:
    
    ```jsx
     // Asynchronous:
     const fs = require('fs');
    
     const content = 'This content will be appended';
    
     fs.appendFile('example.txt', content, err => {
         if (err) {
             console.error(err);
             return;
         }
         console.log('Content appended successfully');
     });
    ```
    
    `fs.appendFile` appends data to the end of a file asynchronously. If the file does not exist, it is created.
    
    ```jsx
     // Synchronous:
     const fs = require('fs');
    
     const content = 'This content will be appended';
    
     try {
         fs.appendFileSync('example.txt', content);
         console.log('Content appended successfully');
     } catch (err) {
         console.error(err);
     }
    ```
    
    - `fs.appendFileSync` appends data to a file synchronously.
    
2. **Deleting Files**:
    
    ```jsx
     // Asynchronous:
     const fs = require('fs');
    
     fs.unlink('example.txt', err => {
         if (err) {
             console.error(err);
             return;
         }
         console.log('File deleted successfully');
     });
    
    ```
    
    `fs.unlink` deletes a file asynchronously. The callback is executed after the file is deleted.
    
    ```jsx
     // Synchronous:
     const fs = require('fs');
    
     try {
         fs.unlinkSync('example.txt');
         console.log('File deleted successfully');
     } catch (err) {
         console.error(err);
     }
    
    ```
    
    `fs.unlinkSync` deletes a file synchronously.
    
3. **Renaming Files**:
    
    ```jsx
     // Asynchronous:
     const fs = require('fs');
    
     fs.rename('oldname.txt', 'newname.txt', err => {
         if (err) {
             console.error(err);
             return;
         }
         console.log('File renamed successfully');
     });
    ```
    
    `fs.rename` renames a file asynchronously. The callback is executed after the file is renamed.
    
    ```jsx
     // Synchronous:
     const fs = require('fs');
    
     try {
         fs.renameSync('oldname.txt', 'newname.txt');
         console.log('File renamed successfully');
     } catch (err) {
         console.error(err);
     }
    ```
    
    `fs.renameSync` renames a file synchronously.
    
4. **Checking if a File Exists**:
    
    ```jsx
     // Asynchronous:
     const fs = require('fs');
    
     fs.access('example.txt', fs.constants.F_OK, (err) => {
         console.log(`${err ? 'File does not exist' : 'File exists'}`);
     });
    ```
    
    `fs.access` check if a file exists and if the program has permission to read, write, or execute it. In this example, `F_OK` check if the file exists.
    
    ```jsx
     // Synchronous:
     const fs = require('fs');
    
     try {
         fs.accessSync('example.txt', fs.constants.F_OK);
         console.log('File exists');
     } catch (err) {
         console.log('File does not exist');
     }
    
    ```
    
    `fs.accessSync` does the same check synchronously.
    

### **Working with Directories**:

- **Creating a Directory**:
    
    ```jsx
      fs.mkdir('newDir', { recursive: true }, (err) => {
          if (err) throw err;
          console.log('Directory created');
      });
    
    ```
    
    `fs.mkdir` creates a new directory. The `recursive: true` option allows creating nested directories if they don't exist.
    
- **Reading a Directory**:
    
    ```jsx
      fs.readdir('someDir', (err, files) => {
          if (err) throw err;
          console.log(files);
      });
    
    ```
    
    `fs.readdir` reads the contents of a directory and returns an array of filenames.
    
- **Removing a Directory**:
    
    ```jsx
      fs.rmdir('newDir', (err) => {
          if (err) throw err;
          console.log('Directory removed');
      });
    
    ```
    
    `fs.rmdir` removes an empty directory.