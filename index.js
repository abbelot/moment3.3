// Import express module
const express = require("express");
// Import Cors to allow Cross-Origin Resource Sharing
const cors = require("cors");
// Import Mongoose
const mongoose = require("mongoose");
// Create express application
const app = express();
// Define port number for server
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/myCV").catch(err => console.error(err));
// Set Mongoose promises, using native ES6 promises
mongoose.Promise = global.Promise;

// Get default connection
const db = mongoose.connection;
// Set up error event listener for MongoDB connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Create db schema
const courseSchema = mongoose.Schema({
    courseId: String,
    courseName: String,
    syllabus: String,
    progression: String,
    semester: String
}, {
    versionKey: false
});
// Compile model from schema
const Course = mongoose.model("Course", courseSchema);

// Set up event listener once the connection to MongoDB is opened
db.once("open", () => {
    console.log("Connected to db");
});

// Middleware
// Enable express to parse JSON request bodies
app.use(express.json());
// Enable CORS for all routes and origins
app.use(cors());


// CRUD OPERATIONS

// POST
app.post("/courses", async (req, res) => {
    try {
        let course = new Course(req.body);
        course = await course.save();
        res.status(201).send(course);
    } catch (err) {
        res.status(400).send(err);
    }
});

// GET all courses
app.get("/courses", async (req, res) => {
    try {
        const courses = await Course.find();
        res.send(courses);
    } catch (err) {
        res.status(500).send(err);
    }
});

// GET single course
app.get("/courses/:_id", async (req, res) => {
    try {
        const course = await Course.findById(req.params._id);
        if (!course) return res.status(404).send();
        res.send(course);
    } catch (err) {
        res.status(500).send(err);
    }
});

// UPDATE
app.put("/courses/:_id", async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params._id, req.body, { new: true, runValidators: true });
        if (!course) return res.status(404).send();
        res.send(course);
    } catch (err) {
        res.status(400).send(err);
    }
});

// DELETE
app.delete("/courses/:_id", async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params._id);
        if (!course) return res.status(404).send();
        res.send(course);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start server and listen for incoming requests on the defined port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});