import app from "./src/app.js"

app.get("/",(req,res)=>{
  res.send("Server is running successfully")
})

app.listen(3000,()=>{
  console.log("Server is running on port 3000")
})