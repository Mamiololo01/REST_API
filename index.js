const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());  

const courses = [
    {id: 1, name: 'Chemistry'},
    {id: 2, name: 'Physics'},
    {id: 3, name: 'Further mathematics'}
]

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

// set route 1
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Http post request
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); 
    if (error) {
        // 400 Bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);

});

// Set routes 2
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found');
    res.send(course);

});

// PUT(update) request
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found');

    const { error } = validateCourse(req.body); 
    if (error) {
        // 400 Bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);

})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);

}

// Delete request
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1)

    res.send(course);

});

// Set port number
const port = process.env.PORT || 3000   
app.listen(port, () => console.log(`Listening on port ${port}`));
