const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch(console.error);

// allows us to process request bodies
app.use(express.json());

app.use((request, response, next) => {
  request.body.owner = {
    _id: "67415f85eb067b8d9515ebc2",
  };

  next();
});

app.use((request, response, next) => {
  request.body.user = {
    _id: "67415f85eb067b8d9515ebc2",
  };

  next();
});

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
