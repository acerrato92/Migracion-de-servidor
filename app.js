
const express = require("express");
const app = express(); 
const task = require("./task.json");
const port = 3001;

app.get("/", (req, res) => {
    res.send("primer servidor")
  });
  
app.get("/task", (req, res) => {
  res.send({
    succes:true,
    content:task
  
})
});


app.use(express.json());
app.listen(port, () => {
    console.log("server runing on port 3001");
});