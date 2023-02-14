// imports
import express, { Express, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
const path = require('path');

dotenv.config()

// constants
const port = Number(process.env.PORT);

const app: Express = express();

const apiRouter = require(path.join(__dirname, 'routes', 'api.js'));

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res:Response) => {
  console.log('request received!');
  res.send('Hello from the other siiiiiiiide!');
});

app.use('/api', apiRouter);

// catch-all route handler for any requests to an unknown route
app.use((req: Request, res:Response) =>
  res.status(404).send('Page not found. What are you doing here??')
);

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
app.use((err: any, req: Request, res: Response, next:NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
