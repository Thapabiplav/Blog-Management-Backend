const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

require("./database/connection");
app.use(express.json());
app.use(cookieParser());

const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");

app.use("/", userRoute);
app.use("/", blogRoute);

app.listen(4000, () => {
  console.log("Project has started at port no 4000");
});
