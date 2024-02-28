const mongoose = require('./connection')
const { Schema, model } = mongoose

const projectSchema = new Schema({
  project: { type: String, required: true },
  username: { type: String, required: true },
  status: { type: String },
  guests: [{ type: String }],
  created_on: { type: Date, value: Date.now() },
  deadline: { type: Date },
  finished_on: { type: Date }
})

const Project = model('Project', projectSchema)
module.exports = Project