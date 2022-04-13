const express = require ('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const { urlencoded } = require('express')
require('dotenv').config()
const notFound = require ('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler');
//Middleware
app.use(express.static('./public'))
app.use(express.json())


//urlenconde
app.use(express.urlencoded({extends: false}))

//routes
app.use('/api/v1/tasks', tasks)

app.use(notFound);
app.use(errorMiddleware);


const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();