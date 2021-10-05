const express    = require('express');

const bodyParser = require('body-parser');
const cors       = require("cors");
const mysql      = require('mysql');
const {Client}   = require('pg');

const app        = express();

// const db = mysql.createConnection({
//     // host:"database-1.ctcgsun63omv.ap-southeast-2.rds.amazonaws.com",
//     host:"localhost",
//     user:"root",
//     password:"nopassword",
//     database:"todolist",
//     multipleStatements : true
// });

const db = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password : "Opaltech@123",
    database: "person",
    multipleStatements : true
});

db.connect();

// db.query(`select * from people;`,(err,res)=>{
//     if(res) {
//         console.log(res.rows)
//     }
//     else{
//         console.log(err.message)
//     }
//     db.end();
// })

app.use(express.json());
app.use(cors());

app.get("/api/get",(req,res) => {

    const sqlFetch = "SELECT * FROM new_table" ;
    db.query(sqlFetch,(err,result) =>{
        res.send(result.rows);
    })
})


app.post('/api/insert',(req,res)=>{

    const list = req.body.list
    const colour = req.body.colour
    const id = req.body.id

    const sqlInsert = "INSERT INTO new_table (id,value,colour) VALUES ($1,$2,$3)";

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

    const sqlUpdate = "UPDATE new_table SET colour = $1 WHERE id = $2";

    db.query(sqlUpdate,[color,id],(err,result) =>{
        console.log(result)
        console.log(err)
        console.log("Hello")
    })
})

app.delete("/api/delete/:id",(req,res) =>{

    const id = req.params.id;
    console.log(id);

    sqlDelete = "Delete from new_table where id = S1";

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