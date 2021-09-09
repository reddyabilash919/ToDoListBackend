const express    = require('express');

const bodyParser = require('body-parser');
const cors       = require("cors");
const mysql      = require('mysql');

const app        = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"nopassword",
    database:"todolist",
    multipleStatements : true
});

app.use(cors());
app.use(express.json());

app.get("/api/get",(req,res) => {

    const sqlFetch = "SELECT * FROM new_table" ;
    db.query(sqlFetch,(err,result) =>{
        res.send(result);
    })
})


app.post('/api/insert',(req,res)=>{

    const list = req.body.list
    const colour = req.body.colour
    const id = req.body.id

    const sqlInsert = "INSERT INTO new_table (id,value,colour) VALUES (?,?,?)";

    db.query(sqlInsert, [id,list,colour],(err,result)=>{

        console.log(result);
        console.log(err);

    })
})

app.delete("/api/delete/all", (req,res)=>{

    sqlDeleteAll = "Delete from new_table";

    db.query(sqlDeleteAll,(err,result) =>{
        console.log(err);
    })
})

app.put('/api/update', (req,res) =>{
    const color =req.body.colour
    const id = req.body.id

    const sqlUpdate = "UPDATE new_table SET colour = ? WHERE id = ?";

    db.query(sqlUpdate,[color,id],(err,result) =>{
        console.log(result)
        console.log(err)
        console.log("Hello")
    })
})

app.delete("/api/delete/:id",(req,res) =>{

    const id = req.params.id;
    console.log(id);

    sqlDelete = "Delete from new_table where id = ?";

    db.query(sqlDelete, id, (err,result) => {
        console.log(err);
        console.log(result)
        
    })

})

app.get("/api/get",(req,res) => {

    const sqlFetch = "SELECT * FROM new_table" ;
    db.query(sqlFetch,(err,result) =>{
        res.send(result);
    })
})

app.listen(3003,()=>{
    console.log("running on port 3003")
});