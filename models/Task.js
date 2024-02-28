const mongoose = require('./connection')
const { Schema, model } = mongoose

const taskSchema = new Schema({
  project: { type: String, required: true },
  projectId: { type: String, required: true },
  username: { type: String },
  task: { type: String },
  status: { type: String },
  category: { type: String },
  guests: [{ type: String }],
  priority: { type: String },
  assigned_to: { type: String },
  department: { type: String },
  created_on: { type: Date, value: Date.now() },
  finished_on: { type: Date }
})

const Task = model('Task', taskSchema)
module.exports = Task