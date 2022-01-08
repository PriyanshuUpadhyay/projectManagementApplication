import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


const { Schema } = mongoose;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  techStack: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
})

var projectModel = mongoose.model('projectDetails', projectSchema);

app.post('/addproject', (req, res) => {

  const name = req.body.name;
  const description = req.body.description;
  const deadline = req.body.deadline;
  const stack = req.body.stack;
  const completed = req.body.completed;

  const project = new projectModel({ name: name, description: description, deadline: deadline, techStack: stack, completed: completed });

  project.save((err, data) => {
    if (err)
      console.log(`Error: ${err.message}`);
    else {
      res.send("Data inserted!")
    }
  })

})

app.post('/editproject', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const deadline = req.body.deadline;
  const stack = req.body.stack;
  const completed = req.body.completed;

  projectModel.findByIdAndUpdate(id, { name: name, description: description, deadline: deadline, techStack: stack, completed: completed }).exec((err, data) => {
    if (err) {
      res.send("Could not complete the request")
    }
    else {
      res.send("Data updated!")
    }
  })

})

app.post('/deleteproject', (req, res) => {
  const id = req.body.id;

  projectModel.findByIdAndRemove(id).exec((err, data) => {
    if (err) {
      res.send("Could not delete the data")
    }
    else {
      res.send("Data deleted!")
    }
  })

})

app.get('/getprojects', (req, res) => {
  projectModel.find({}).exec((err, data) => {
    if (err)
      res.send(err.message)
    else {
      res.send(data)
    }
  })
})

const URI = process.env.ATLAS_URI
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log("Error: " + err.message);
  }
  else {
    console.log("connection successful");
  }
})




const port = process.env.PORT || 3001;

app.listen(port, (err) => {
  if (err) {
    console.log("Error: " + err.message)
  }
  else {
    console.log("Listening on port " + port)
  }
});