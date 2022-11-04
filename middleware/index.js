require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// error handler
const notFoundMiddleware = require('../middleware/not-found');
const errorHandlerMiddleware = require('../middleware/error-handler.js');

app.use(express.json());
//extra packages

app.get('/', (req, res) => {
  res.send('node js assessment api');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error);
  }
};
