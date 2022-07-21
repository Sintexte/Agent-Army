const express = require('express')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const mysql = require('mysql')
const bcrypt = require('bcryptjs')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//global config file
dotenv.config();

const port = process.env.PORT

//TODO put db info in a config file
const dbname = process.env.DB_NAME 
var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS, 
  database: dbname
});


app.get('/',(req, res)=> {
  res.send("API")
})

app.post('/api/', (req, res) => {
  res.send('API')
})

//TODO['/api/login'] clean code; check for tests(doesnt break for multiple use cases); 
app.post('/api/login', (req,res)=>{
  if(req.body.username && req.body.password){
      con.query("select * from user where username = ?",[req.body.username], (err, result, fields) =>{
        if(err){ 
          callback(err) 
          return res.send(403)
        }
        if(result.length){
          let role = result[0].id_role
          bcrypt.compare(req.body.password, result[0].password, (err, result) => { 
            if(result){
              //TODO generate token here
              let jwtSecretKey = process.env.JWT_SECRET_KEY;
              let data = {
                  username: req.body.username,
                  id_role: role
              }
            
              const token = jwt.sign(data, jwtSecretKey);
            
              return res.send({data:{"token":token}});
            }
            else return res.sendStatus(403)
          })
        }else{
          return res.sendStatus(403)
        }
        
      })
  }else{
      res.sendStatus(400)
  }
})

//TODO['/api/register'] clean code; check for tests (didnt check)
app.post('/api/register', (req,res)=>{
  if(req.body.username && req.body.password && req.body.lastname && req.body.firstname && req.body.token){
    //verify token for admin only
    jwt.verify(req.body.token, process.env.JWT_SECRET_KEY,(err, data)=>{
      if(data == undefined) res.sendStatus(403);return
      console.log(data);
    })
    //hashing password
    bcrypt.hash(req.body.password, 1,(err,hash)=>{
      if(err){ 
        logd("Error while Hashing the Password")
        console.log(err)
        res.sendStatus(500);return
      }
      con.query("insert into user (username,password,firstname,lastname,id_role) VALUES (?,?,?,?,1)",
                  [req.body.username, hash, req.body.firstname, req.body.lastname], (err, result)=> {
                    if(err) throw err;
                    logd("User Was Created") 

                    res.sendStatus(200);return
                  })
    })
  }else{
      res.sendStatus(400);return
  }
})

app.listen(port, () => {
  logd(`Starting BackEnd Server {Agent_army/web_admin} on port ${port}`)
  init_backend()
})


init_backend = () => {
  //TODO create db and tables if not found
  //Initializing the app and db
  
  logd(`Connecting to Mysql host->${con.config.host}:${con.config.port} db->${dbname}`)
  con.connect((err)=> {
    if(err){
      logd("Couldn't Connect to Mysql Database")
      throw err;
    }
    logd("Successfully Connected to Mysql!")
  })
}

logd = (msg) => {
  //for debug purpouses in terminal
  console.log(`[*] ${msg}`);
}

//TO-USE
//https://stackoverflow.com/questions/47151661/where-to-store-jwt
//https://stackoverflow.com/questions/36892173/back-end-password-encryption-vs-hashing
//https://medium.com/@vuongtran/using-node-js-bcrypt-module-to-hash-password-5343a2aa2342
//https://cloud.smartdraw.com/editor.aspx?credID=-39678246&depoId=36107304&flags=128
//https://stackoverflow.com/questions/31309759/what-is-secret-key-for-jwt-based-authentication-and-how-to-generate-it

//STORE
//  -used sql command to create form_field:
//      CREATE TABLE form_field ( id_form int NOT NULL , id_field int NOT NULL, PRIMARY KEY (id_field, id_form), FOREIGN KEY(id_form) REFERENCES form(id), FOREIGN KEY(id_field) REFERENCES field(id) )
//  - password compare
//      bcrypt.compare(req.body.password, hash, (err, res) => { logd(res) }
