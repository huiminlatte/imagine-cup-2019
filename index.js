const mysql = require('mysql'); //mysql manager
const bodyParser = require('body-parser');  // parsing json (for POST request)
const express = require('express');

const app = express();
cors = require('cors'), app.use(cors());
app.use(bodyParser.json());
global.__basedir = __dirname;

const multer = require('multer');   // file storage
const csv = require('fast-csv');
const fs = require('fs');       //package for file system

// create a connection on mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydb'
});

connection.connect((error) => {
    if (error) {
        console.error(error);
    } else {
        console.log("Connected to Database");
    }
})


app.get('/', (req, res) => {
    res.send("Hello World!");
    console.log(req.query);
})

// 2 - Sample GET request 
app.get("/api/getsample", function (req, res) {
    var a = req.query.a;
    var b = req.query.b;
    res.send(a + b);
});

// -> Multer Upload Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});
const upload = multer({
    storage: storage
});

// Sample SQL query 
app.post('/api/uploadfile', upload.single("uploadfile"), (req, res) => {
    importCSVFile(__basedir + '/uploads/' + req.file.filename);
    res.json({
        'msg': 'File uploaded/import successfully!',
        'file': req.file
    });
});


function importCSVFile(filePath) {
    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            csvData.shift(); // Remove Header ROW

            // Open the MySQL connection
            var sql_droptable = 'DROP TABLE IF EXISTS TABLE1';
            connection.query(sql_droptable, (error, response) => {
                console.log(error || response);
            })

            var sql_create = 'CREATE TABLE IF NOT EXISTS TABLE1 (COL1 VARCHAR(255) NOT NULL, COL2 VARCHAR(255) NOT NULL, PRIMARY KEY (COL1))';
            connection.query(sql_create, (error, response) => {
                console.log(error || response);
            })

            let sql_import = 'INSERT INTO TABLE1 (COL1, COL2) VALUES ?';
            connection.query(sql_import, [csvData], (error, response) => {
                console.log(error || response);
            });

            // delete file after saving to MySQL database
            // -> you can comment the statement to see the uploaded CSV file.
            fs.unlinkSync(filePath)
        });
    stream.pipe(csvStream);
}


//Delete table
app.put("/api/droptables", function (req, res) {
    var tablename = req.query.tablename;
    var apiResult = {};
    var query = "DROP TABLE " + tablename;
    connection.query(query, function (err, result) {
        if (err) {
            apiResult = {
                "success": "no",
                "data": err,
            }
        } else {
            apiResult = {
                "success": "yes",
                "data": tablename
            }
        }
        res.json(apiResult);
    })
});


// Create a Server
let server = app.listen(8080, function () {

    let host = server.address().address
    let port = server.address().port

    console.log("App listening at http://%s:%s", host, port)

})