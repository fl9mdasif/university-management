import { Request, Response, NextFunction } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'
import handleValidationError from '../../errors/handleValidationError'
import { error } from 'winston'
import ApiError from '../../errors/ApiError'
import { Error } from 'mongoose'
const globalErrorHandler = (
  err: Error.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).json({ errB: err })

  let statusCode = 500
  let message = 'something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err.stack : undefined,
  })
  next()
}

export default globalErrorHandler
