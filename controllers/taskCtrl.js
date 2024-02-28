// backend/routes/tasks.js
// routes/tasks.js
const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET a single task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (task) {
      res.json(task)
    } else {
      res.status(404).json({ message: 'Task not found' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST create a new task
router.post('/', async (req, res) => {
  try {
    const { description, priority, status } = req.body
    const newTask = new Task({
      description,
      priority,
      status
    })
    const savedTask = await newTask.save()
    res.status(201).json(savedTask)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// PUT update a task
router.put('/:id', async (req, res) => {
  try {
    const { description, priority, status } = req.body
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
      description,
      priority,
      status
    }, { new: true })
    if (updatedTask) {
      res.json(updatedTask)
    } else {
      res.status(404).json({ message: 'Task not found' })
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE a task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id)
    if (deletedTask) {
      res.json({ message: 'Task deleted', deletedTask })
    } else {
      res.status(404).json({ message: 'Task not found' })
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
