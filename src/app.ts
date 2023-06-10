import express, { Application } from 'express'
import cors from 'cors'
// import ApiError from './errors/ApiError'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.router'

const app: Application = express()
app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application route
app.use('/api/v1/users/', UserRoutes)

//testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   //   Promise.reject(new Error('Un-handle promise Rejection'))
//   console.log(x)
// })

// global error handler
app.use(globalErrorHandler)

export default app
