import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.router'

const app: Application = express()
app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application route
// console.log(app.get('env'))
app.use('/api/v1/users/', usersRouter)

//testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
