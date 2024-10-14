
# Template Engines

## What are Template Engines?

Template engines are tools that allow developers to generate dynamic HTML pages by combining templates with data. They provide a way to separate the presentation layer from the application logic, making it easier to manage and maintain web applications. Template engines process templates (which can contain placeholders for data) and render them into HTML before sending them to the client.

**Key Features:**

1. **Dynamic Content:** Template engines can dynamically generate HTML content based on user input, database queries, or any other data source.
  
2. **Separation of Concerns:** They separate the design (HTML/CSS) from the application logic, allowing developers and designers to work independently.
  
3. **Reusable Templates:** Templates can be reused across different parts of the application, promoting DRY (Don't Repeat Yourself) principles.

4. **Control Structures:** Many template engines support control structures (like loops and conditionals) that allow for more complex rendering logic.

## Use Cases of Template Engines

1. **Web Applications:** Commonly used in server-side web applications to render HTML pages dynamically. For example, in Node.js applications, template engines like EJS, Pug, and Handlebars are used to create views.

2. **Email Templates:** Template engines are often used to generate HTML email content. This allows for personalized emails with dynamic data (e.g., user names, order details).

3. **Static Site Generation:** Some template engines can be used for static site generation, where they compile templates into static HTML files for improved performance and SEO.

4. **Content Management Systems (CMS):** Template engines enable dynamic content rendering in CMSs, allowing users to create and manage content without directly modifying HTML.

5. **Single Page Applications (SPAs):** Although SPAs often rely on client-side rendering, template engines can still be used to generate initial HTML that gets sent to the browser.

## EJS (Embedded JavaScript)

### What is EJS?

EJS (Embedded JavaScript) is a simple templating language that lets you generate HTML markup with plain JavaScript. It allows you to embed JavaScript code directly into your HTML templates, making it easy to create dynamic content.

**Key Features of EJS:**

1. **Syntax:** EJS uses a straightforward syntax, allowing you to include JavaScript expressions and logic within the HTML.

   - **Variables:** Use `<%= variable %>` to output a variable’s value.
   - **Logic:** Use `<% if(condition) { %> ... <% } %>` for conditional rendering.

2. **Layouts and Partials:** EJS supports layouts and partials, enabling you to create reusable components and maintain a consistent look across pages.

3. **Integration with Node.js:** EJS integrates seamlessly with Node.js applications, allowing you to easily render templates on the server side.

4. **Lightweight:** EJS is lightweight and has minimal overhead, making it a fast choice for server-side rendering.

### Example of EJS Usage:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My EJS Page</title>
</head>
<body>
    <h1>Hello, <%= user.name %>!</h1>
    <% if(user.isAdmin) { %>
        <p>Welcome, Admin!</p>
    <% } else { %>
        <p>Welcome, User!</p>
    <% } %>
</body>
</html>
```

### Use Cases of EJS:

1. **Server-Side Rendering:** Used in Node.js applications to render dynamic HTML based on server-side data.
2. **Form Generation:** Generate forms dynamically based on data models or user input.
3. **Conditional Rendering:** Display different content based on user roles, preferences, or states.
4. **Building Dashboards:** Create interactive dashboards that require dynamic data updates.

By leveraging template engines like EJS, developers can create more efficient, maintainable, and dynamic web applications.

# Setting Up EJS in Express

## Step 1: Create a New Express Application

If you haven’t already created an Express application, you can do so by following these steps:

1. **Initialize a new project** (if you haven’t done this yet):

   ```bash
   mkdir my-ejs-app
   cd my-ejs-app
   npm init -y
   ```

2. **Install Express**:

   ```bash
   npm install express
   ```

## Step 2: Install EJS

Install EJS as a dependency in your project:

```bash
npm install ejs
```

## Step 3: Set Up Your Express Server

Create a new file named `app.js` (or `server.js`) and set up your Express server:

```javascript
// app.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the directory for your EJS views
app.set('views', path.join(__dirname, 'views'));

// Serve static files (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Define a route
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page', message: 'Welcome to my EJS app!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

## Step 4: Create the Views Directory

Create a `views` directory in the root of your project to store your EJS templates:

```bash
mkdir views
```

## Step 5: Create an EJS Template

Create an `index.ejs` file inside the `views` directory:

```html
<!-- views/index.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><%= title %></title>
</head>
<body>
    <h1><%= message %></h1>
    <p>This is an EJS template!</p>
</body>
</html>
```

## Step 6: Run the Application

Start your Express server:

```bash
node app.js
```

## Step 7: Access Your Application

Open your web browser and navigate to `http://localhost:3000`. You should see the message from your EJS template rendered dynamically.

## Additional Tips

- **Dynamic Data:** You can pass any data from your route to the EJS template, allowing for dynamic content generation.
  
- **Layouts and Partials:** If you want to use layouts or partials, you can set up additional directories for these files and include them in your EJS templates.

- **Static Files:** Place your static files (CSS, JS, images) in a `public` directory, and use `app.use(express.static(path.join(__dirname, 'public')));` to serve them.

By following these steps, you’ll have a basic Express application set up with EJS as the template engine. You can further expand your application by adding more routes and EJS templates as needed.
