// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;

// Setup Server
const server = app.listen(port, ()=>{console.log(`This server is running on localhost: ${port}`)});

// Set up GET route
app.get("/all", (req, res) => {
    // convert object to array
    const projectDataEntries = Object.values(projectData);
    // Return array to app
    res.send(projectDataEntries);
})

// POST the weather entry
app.post("/add", (req,res) => {
    newData = req.body;
    // Add posted data to projectData object
    projectData["temperature"] = newData.temperature,
    projectData["date"] = newData.date,
    projectData["content"] = newData.content
});