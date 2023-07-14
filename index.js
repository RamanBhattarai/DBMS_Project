const {Pool} = require ('pg')
const express = require ('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.listen(3000, () => {console.log(`Server on port :3000`)});

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

app.post("/submit", (req, res) => {
    const { fname, lname, address, DOB} = req.body;

    //const fname = req.body["fname"];
    //const lname = req.body["lname"];
    //const address = req.body["address"];
    //const DOB = req.body.["DOB"];
    //"INSERT INTO tbl_data(First_Name,Last_Name,Address,DOB) VALUES( "$(fname)" , "$(lname)", "$(address)", "$(dob)" )";

    pool.query("INSERT INTO tbl_data(First_Name,Last_Name,Address,DOB) VALUES($1,$2,$3,$4)",
      [fname, lname, address, DOB],(err, result) => {
        if (!err) {
          res.send("Data recorded");
        } else {
          console.error("Error in recording data : ", err);
          res.send("Error in recording data ");
        }
      }
    );
});
