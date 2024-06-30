import type { Express, Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from 'multer'
import { todoRouter } from './routes'
const app: Express = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer().any())
app.use(cors())
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/todo', todoRouter)
