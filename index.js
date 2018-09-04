const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const Router = require('./app/routes/note.routes');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/api', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});
Router(app);
// listen for requests
app.listen(PORT, () => {
    console.log("Server is start");
});