require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// connectDB
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');

// routers
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const carsRouter = require('./routes/cars');
// add product router

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
//extra packages

// routes
app.use('/api/session', authRouter);
app.use('/api', authenticateUser, userRouter);
app.use('/api', authenticateUser, carsRouter);

app.get('/', (req, res) => {
  res.send('node js assessment api');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error);
  }
};

start();
