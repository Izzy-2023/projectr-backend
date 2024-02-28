// routes/tasks
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

// show single task's details
router.get('/:id', async (req, res) => {
  try {
    const tasks = await Task.find({ _id: req.params.id })
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST create a new task

router.post('/', async (req, res) => {
  try {
    res.json(await Task.create(req.body))
  } catch (err) {
    res.status(400).json(err)
  }
})

// PUT update a task
router.put('/:id', async (req, res) => {
  try {
    res.json(await People.findByIdAndUpdate(req.params.id, req.body))
  } catch (err) {
    res.status(400).json(err)
  }
})

// DELETE a task
router.delete('/:id', async (req, res) => {
  try {
    const targetTask = await Task.findById(req.params.id)
    if (targetTask) {
      const deletedTask = await Task.findByIdAndDelete(req.params.id)
      res.json({ deletedTask, message: 'Task deleted' })
    } else {
      res.json({ message: 'Task not found' })
    }
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router
