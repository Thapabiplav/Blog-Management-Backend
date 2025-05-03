const express = require('express')
const app = express()

require('./database/connection')

app.listen(4000,(req,res)=>{
  console.log("Project has started at port no 4000");
})