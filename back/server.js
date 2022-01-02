import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());


const { Schema } = mongoose;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  deadline: {
    type: Date,
    required: true
  },
  techStack: {
    type: String,
  }
})

var project = mongoose.model('projectDetails', projectSchema);




const URI = process.env.ATLAS_URI
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log("Error: " + err.message);
  }
  else {
    console.log("connection successful");
  }
})














const port = process.env.PORT || 8000;

app.listen(port, (err) => {
  if (err) {
    console.log("Error: " + err.message)
  }
  else {
    console.log("Listening on port " + port)
  }
});