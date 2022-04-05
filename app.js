const express = require('express')
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors())
app.options('*', cors())

const students = [{
        id: 1,
        name: "SampleUser",
        email: "exaple@gmail.com",
        gender: "Male",
        status: "Active",
        age: 25
    },
    {
        id: 2,
        name: "SampleUser2",
        email: "sampleUser2@gmail.com",
        gender: "Female",
        status: "Active",
        age: 21
    }
]

app.get('/students', async(req, res) => {
    res.send(students)
})
app.get('/students/:id', async(req, res) => {
    const student = students.find(b => b.id === parseInt(req.params.id))

    if (!student)
        res.status(404).send("Student Not Found")

    res.json(student)
})
app.post('/students/create', async(req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
        age: req.body.age
    }

    students.push(student)

    res.status(201).send(student)
})
app.patch('/students/update/:id', async(req, res) => {
    const student = students.find(b => b.id === parseInt(req.params.id))
    if (!student)
        res.status(404).send("Student Not Found")

    student.name = req.body.name,
        student.email = req.body.email,
        student.gender = req.body.gender,
        student.status = req.body.status,
        student.age = req.body.age


    console.log(student)
    res.json(student)

})

app.delete('/students/delete/:id', (req, res) => {

    const student = students.find(b => b.id === parseInt(req.params.id))
    const studentIndex = students.indexOf(student)
    students.splice(studentIndex, 1)
    res.send(student)
})

app.listen(9000)