"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path = require('path');
dotenv_1.default.config();
// constants
const port = Number(process.env.PORT);
const app = (0, express_1.default)();
const apiRouter = require(path.join(__dirname, 'routes', 'api.js'));
/**
 * handle parsing request body
 */
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    console.log('request received!');
    res.send('Hello from the other siiiiiiiide!');
});
app.use('/api', apiRouter);
// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('Page not found. What are you doing here??'));
/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
app.use((err, req, res, next) => {
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
