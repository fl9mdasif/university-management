import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routerRoutes from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application route
app.use('/api/v1/', routerRoutes);

//testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   //   Promise.reject(new Error('Un-handle promise Rejection'))
//   console.log(x)
// })

// global error handler
app.use(globalErrorHandler);

//handle not found route

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    messages: 'url not found',
    errorMessages: [
      {
        path: req.originalUrl,
        messages: 'Api not found',
      },
    ],
  });
  next();
});

export default app;
