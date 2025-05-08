const express = require("express");
const app = express();

require("./database/connection");
app.use(express.json());

const userRoute = require("./routes/userRoute");

app.use("/", userRoute);

app.listen(4000, () => {
  console.log("Project has started at port no 4000");
});
