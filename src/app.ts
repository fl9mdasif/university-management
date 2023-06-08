import express, { Application } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.router'
// import ApiError from './errors/ApiError'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()
app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application route
app.use('/api/v1/users/', usersRouter)

//testing
// app.get('/', (req: Request, res: Response) => {
//   // res.send('Hello World!')
//   // throw new ApiError(400, 'null error', '')
// })

// global error handler
app.use(globalErrorHandler)

export default app
