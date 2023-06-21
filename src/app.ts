import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routerRoutes from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application route
app.use('/api/v1', routerRoutes);

app.use(globalErrorHandler);

//handle not found route
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    messages: 'url not found',
    errorMessages: [
      {
        path: req.originalUrl,
        messages: 'Api(url) not found',
      },
    ],
  });
  // next();
});

export default app;
