// -----------------------------------------------------
// Dependencies
// -----------------------------------------------------
const express = require('express')
const Project = require('../models/Project')
const Task = require('../models/Task')
const router = express.Router()

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find()
    res.json(projects)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
  console.dir(req.params.id)
  try {
    const tasks = await Task.find({ projectId: req.params.id })
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST create a new project
router.post('/', async (req, res) => {
  try {
    res.json(await Project.create(req.body))
    console.log(req.body)
  } catch (err) {
    res.status(400).json(err)
  }
})

// PUT update a project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id)
    if (project) {
      project.project = req.body.project || project.project
      project.username = req.body.username || project.username
      project.status = req.body.status || project.status
      project.guests = req.body.guests || project.guests
      project.deadline = req.body.deadline || project.deadline
      project.finished_on = req.body.finished_on || project.finished_on

      const updatedProject = await project.save()
      res.json(updatedProject)
    } else {
      res.status(404).json({ message: 'Project not found' })
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE a project

router.delete('/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ message: 'Project deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
