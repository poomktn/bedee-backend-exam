import type { Request, Response } from 'express'
import express from 'express'
import database from '../database.json'
const router = express.Router()

router.post('/create', async (req: Request, res: Response) => {
  const { text } = req.body
  let code = 200
  let message = ''
  if (text) {
    message = `you create to-do ${text}`
    database.push({ text, status: 'active' })
  } else {
    code = 400
    message = 'cannot create this to-do'
  }
  res.status(code).json({ message, database })
})

router.get('/get', async (req: Request, res: Response) => {
  const { filter } = req.params
  let code = 200
  switch (filter) {
    case 'all':
      res.status(code).json({ database })
      break
    case 'active':
    case 'complete':
      const result = database.filter(item => item.status === filter)
      res.status(code).json({ database: result })
      break
    default:
      res.status(code).json({ database })
      break
  }
})

router.patch('/update', async (req: Request, res: Response) => {
  const { text } = req.body
  let code = 200
  let message = ''
  if (text) {
    message = `task ${text} is completed`
    const newTask = database.filter(item => item.text === text)
    if (newTask.length) {
      let completeTask = { ...newTask[0] }
      completeTask.status = 'complete'
      const foundIdx = database.indexOf(newTask[0])
      database.splice(foundIdx, 1, completeTask)
    } else {
      code = 400
      message = 'cannot update this to-do'
    }
  } else {
    code = 400
    message = 'cannot update this to-do'
  }
  res.status(code).json({ message, database })
})

router.delete('/delete', async (req: Request, res: Response) => {
  const { text } = req.body
  let code = 200
  let message = ''
  const result = database.filter(item => item.text === text)
  if (result.length) {
    database.splice(database.indexOf(result[0]), 1)
    message = `task ${text} has been deleted`
  } else {
    code = 400
    message = 'cannot error'
  }
  res.status(code).json({ message, database })
})

export { router as todoRouter }
