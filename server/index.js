const express=require('express');
const databaseConnection=require('./database');
const bookRoutes=require('./routes/book.routes');
const cors=require('cors');
// const mongoose=require('mongoose');

databaseConnection();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res) =>{
    res.send("Hello World");
})

app.use('/book', bookRoutes);

app.listen(8000, () =>{
    console.log("Server is running on port 8000");
})