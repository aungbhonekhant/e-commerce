const express = require("express");
const env = require("dotenv");
let app = express();
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors');

//enviroment variable
env.config();

//mongodb connection
//mongodb+srv://aungkhant:<password>@cluster0.h4kmt.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.h4kmt.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  )
  .then(() => {
    console.log("Database connected");
  });

// mongoose
// .connect(
//   `mongodb://localhost:27017/my_eco`,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
//   }
// )
// .then(() => {
//   console.log("Database connected");
// });

//middleware
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));

//routes

app = require("./routes/")(app);

//===>

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
