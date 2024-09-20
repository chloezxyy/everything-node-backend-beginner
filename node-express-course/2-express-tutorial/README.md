## To run the `2-http-app` server file

Copy and paste the code from `2-http-app.js` into the root of `/2-express-tutorial` into `app.js` to start the server by running `npm run dev`.
This will start the server on port 5000. You can access the server at http://localhost:5000

### What does static mean?
A file that server doesn't have to change.

### What is middleware?

### How to make my app dynamic?
Static rendering:
JS makes our app dynamic, but only on the browser, on the server side its just static (it doesn't need change). 

Server-side rendering:
We can make it dynamic by using templating engines like EJS, Handlebars, Pug, etc.  

### Express
2 ways to use express:
1. **API** - Setting up a HTTP interface to **interact with our data** (in JSON). And sent back response with **res.JSON()**
2. SSR 