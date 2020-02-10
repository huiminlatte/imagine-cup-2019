var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// default route
app.get("/", function(req, res) {
  return res.send({ error: true, message: "hello" });
});
// set port
app.timeout = 0;
app.listen(process.env.PORT || 3000, function() {
  console.log("Node app is running on port 3000");
});
module.exports = app;
// connection configurations
var dbConn = mysql.createConnection({
  host: "sqlimaginecup.mysql.database.azure.com",
  user: "huiminlatte@sqlimaginecup",
  password: "Password123",
  database: "imaginecup",
  port: 3306,
  ssl: false
});

// connect to database
dbConn.connect(function(err) {
  if (err) {
    console.log("!!! Cannot connect !!! Error:");
    throw err;
  } else {
    console.log("Connection established.");
  }
});

// Add a new user  (patient)
app.post("/api/CreateUser/Patient", function(req, res) {
  let user = req.body;
  console.log(user);

  if (!user) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user" });
  }

  let sql_create =
    "CREATE TABLE IF NOT EXISTS users (username VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, usertype VARCHAR(255) NOT NULL, email_address VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY (username))";
  dbConn.query(sql_create, user, function(error, results, fields) {
    if (error) throw error;
  });

  dbConn.query("INSERT INTO users SET ? ", user, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "New user has been created successfully."
    });
  });
});

// Add a new user  (physiotherapist)
app.post("/api/CreateUser/Physiotherapist", function(req, res) {
  let user = req.body;
  console.log(user);

  if (!user) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user" });
  }

  let sql_create =
    "CREATE TABLE IF NOT EXISTS users (username VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, usertype VARCHAR(255) NOT NULL, email_address VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY (username))";
  dbConn.query(sql_create, user, function(error, results, fields) {
    if (error) throw error;
  });

  dbConn.query("INSERT INTO users SET ? ", user, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "New user has been created successfully."
    });
  });
});

// Add a new user  (caretaker)
app.post("/api/CreateUser/Caretaker", function(req, res) {
  let user = req.body;
  console.log(user);

  if (!user) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user" });
  }

  let sql_create =
    "CREATE TABLE IF NOT EXISTS users (username VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, usertype VARCHAR(255) NOT NULL, email_address VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY (username))";
  dbConn.query(sql_create, user, function(error, results, fields) {
    if (error) throw error;
  });

  dbConn.query("INSERT INTO users SET ? ", user, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "New user has been created successfully."
    });
  });
});

//Retrieve database of physiotherapist
app.post("/api/Physiotherapist/database", function(req, res) {
  dbConn.query(
    "SELECT * FROM users WHERE usertype= 'Physiotherapist'",
    function(error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Registered Physiotherapists."
      });
    }
  );
});

//Add patient profile for new user
app.post("/api/CreateUser/Patient/profile", function(req, res) {
  let user = req.body;
  console.log(user);

  if (!user) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide details" });
  }

  let sql_create =
    "CREATE TABLE IF NOT EXISTS patientdetails (patient_username VARCHAR(255) NOT NULL, Height VARCHAR(255), BMI VARCHAR(255), RehabCentre VARCHAR(255), MedicalCondition VARCHAR(255), PRIMARY KEY (patient_username))";
  dbConn.query(sql_create, user, function(error, results, fields) {
    if (error) throw error;
  });
  dbConn.query("INSERT INTO patientdetails SET ? ", user, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "Details have been added successfully."
    });
  });
});

//Add patient details for new user
app.post("/api/CreateUser/Patient/details", function(req, res) {
  let user = req.body;
  console.log(user);

  if (!user) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide details" });
  }

  let sql_create =
    "CREATE TABLE IF NOT EXISTS patientdetails (patient_username VARCHAR(255) NOT NULL, ExerciseID VARCHAR(255), ExerciseDate VARCHAR(255), TotalExerciseCount INT(4), TotalExerciseCompleted INT(4), ActiveExercise TINYINT(1), WeeklySchedule VARCHAR(255), PRIMARY KEY (patient_username))";
  dbConn.query(sql_create, user, function(error, results, fields) {
    if (error) throw error;
  });
  dbConn.query("INSERT INTO patientdetails SET ? ", user, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "Details have been added successfully."
    });
  });
});

// Check if username exists
app.get("/api/usernameexists/:username", function(req, res) {
  let check_username = req.params.username;
  console.log(check_username);
  var apiResult = {};
  if (!check_username) {
    apiResult = { error: true, message: "Please provide username" };
    res.json(apiResult);
  }

  dbConn.query(
    "SELECT EXISTS(SELECT * FROM users WHERE username='" +
      check_username +
      "') AS Result",
    (err, res2) => {
      console.log(err || res2);
      console.log(res2[0].Result);
      if (res2[0].Result) {
        apiResult = {
          error: false,
          message:
            "Username already exists, please select a different username."
        };
      } else {
        apiResult = {
          error: false,
          message: "Username has not been used yet."
        };
      }
      res.json(apiResult);
    }
  );
});

//Check password for verification
app.post("/api/CheckPassword", function(req, res) {
  let username = req.body.username;
  console.log(username);
  let password = req.body.password;
  console.log(password);
  if (!username) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide username" });
  }
  if (!password) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide password" });
  }

  let sql_check = "SELECT * FROM users WHERE username=?";
  dbConn.query(sql_check, username, function(error, results, fields) {
    if (error) throw error;
    else {
      if (password == results[0].password) {
        return res.send({ error: false, message: "OK, user verifed." });
      } else {
        return res.send({
          error: false,
          message: "Wrong password, please try again."
        });
      }
    }
  });
});

// Add patient into Physiotherapist account
app.post("/api/Physiotherapist/addpatient", function(req, res) {
  let patient = req.body;
  console.log(patient);

  if (!patient) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide patient" });
  }
  let sql_create =
    "CREATE TABLE IF NOT EXISTS PhysiotherapistAndPatient (patient_username VARCHAR(255) NOT NULL, physiotherapist_username VARCHAR(255) NOT NULL, Startdate DATE, LastVisitDate DATE, STATUS TINYINT(1), PRIMARY KEY (patient_username))";
  dbConn.query(sql_create, patient, function(error, results, fields) {
    if (error) throw error;
  });

  dbConn.query(
    "INSERT INTO PhysiotherapistAndPatient SET ? ",
    patient,
    function(error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Patient has been added successfully."
      });
    }
  );
});

// Add patient into Caretaker account
app.post("/api/Caretaker/addpatient", function(req, res) {
  let patient = req.body;
  console.log(patient);

  if (!patient) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide patient" });
  }
  let sql_create =
    "CREATE TABLE IF NOT EXISTS CaretakerAndPatient (patient_username VARCHAR(255) NOT NULL, caretaker_username VARCHAR(255) NOT NULL, PRIMARY KEY (patient_username))";
  dbConn.query(sql_create, patient, function(error, results, fields) {
    if (error) throw error;
  });
  dbConn.query("INSERT INTO CaretakerAndPatient SET ?", patient, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "Patient has been added successfully."
    });
  });
});

//physiotherapist get details on one specific patient
app.post("/api/Physiotherapist/ViewPatientsDetails", function(req, res) {
  let username = req.body.username;
  if (!username) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide username" });
  }
  dbConn.query(
    "SELECT * FROM patientdetails WHERE patient_username=?",
    username,
    function(error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results[0],
        message: "patient details"
      });
    }
  );
});

//caretaker get details on one specific patient
app.post("/api/Caretaker/ViewPatientsDetails", function(req, res) {
  let username = req.body.username;
  if (!username) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user_id" });
  }
  dbConn.query(
    "SELECT * FROM patientdetails WHERE patient_username=?",
    username,
    function(error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results[0],
        message: "patient details"
      });
    }
  );
});

//physiotherapist get all their patients
app.post("/api/Physiotherapist/viewPatients", function(req, res) {
  let physiotherapist_username = req.body.physiotherapist_username;
  if (!physiotherapist_username) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide your username" });
  }

  let patients =
    "SELECT PhysiotherapistAndPatient.patient_username, PhysiotherapistAndPatient.Startdate, PhysiotherapistAndPatient.LastVisitDate, users.name FROM PhysiotherapistAndPatient INNER JOIN users ON PhysiotherapistAndPatient.patient_username = users.username WHERE PhysiotherapistAndPatient.physiotherapist_username ='" +
    physiotherapist_username +
    "'";

  dbConn.query(patients, function(error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "Patients" });
  });
});

//physiotherapist can check details of all patients
app.post("/api/Physiotherapist/viewAllMyPatientsDetails", function(req, res) {
  let physiotherapist_username = req.body.physiotherapist_username;
  if (!physiotherapist_username) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide your username" });
  }

  let patient_details =
    "SELECT PhysiotherapistAndPatient.patient_username, patientdetails.ActiveExercise, patientdetails.ActiveExercise, patientdetails.ExerciseID, patientdetails.TotalExerciseCount, patientdetails.WeeklySchedule, patientdetails.TotalExerciseCompleted, PhysiotherapistAndPatient.LastVisitDate FROM PhysiotherapistAndPatient LEFT JOIN patientdetails ON PhysiotherapistAndPatient.patient_username = patientdetails.patient_username WHERE PhysiotherapistAndPatient.physiotherapist_username ='" +
    physiotherapist_username +
    "'ORDER BY PhysiotherapistAndPatient.patient_username";

  dbConn.query(patient_details, function(error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "patient details"
    });
  });
});

//physiotherapist update patient's exercise
app.post("/api/Physiotherapist/UpdateExercise", function(req, res) {
  console.log(req.body);
  let patient_username = req.body.patient_username;
  let ExerciseID = req.body.ExerciseID;
  let ExerciseDate = req.body.ExerciseDate;
  let TotalExerciseCount = req.body.TotalExerciseCount;
  if (!patient_username) {
    return res
      .status(400)
      .send({ error: true, message: "Please insert username" });
  }
  if (!ExerciseID) {
    return res
      .status(400)
      .send({ error: true, message: "Please insert ExerciseID" });
  }
  if (!ExerciseDate) {
    return res
      .status(400)
      .send({ error: true, message: "Please insert dates" });
  }
  if (!TotalExerciseCount) {
    return res
      .status(400)
      .send({ error: true, message: "Please insert exercise count" });
  }

  let sql_update =
    "UPDATE patientdetails " +
    "SET ExerciseID='" +
    ExerciseID +
    "', ExerciseDate='" +
    ExerciseDate +
    "', TotalExerciseCount='" +
    TotalExerciseCount +
    "'" +
    " WHERE patient_username='" +
    patient_username +
    "'";

  dbConn.query(sql_update, function(error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, message: "Exercise updated successfully" });
  });
});

//patient view their exercise schedule
app.post("/api/Patient/viewExercise", function(req, res) {
  let username = req.body.patient_username;
  console.log(username);
  if (!username) {
    return res
      .status(400)
      .send({ error: true, message: "Please insert username" });
  }
  let sql_show =
    "SELECT ExerciseDate, TotalExerciseCount-TotalExerciseCompleted AS 'TotalExercisesLeft', ExerciseID FROM patientdetails WHERE patient_username= '" +
    username +
    "';";

  dbConn.query(sql_show, function(error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "Here are your exercises!"
    });
  });
});

//when patient completes exercise
app.post("/api/Patient/completeExercise", function(req, res) {
  let patient_username = req.body.patient_username;
  let ExerciseID = req.body.ExerciseID;
  console.log(req.body);
  if (!patient_username) {
    return res
      .status(400)
      .send({ error: true, message: "Please insert username" });
  }
  if (!ExerciseID) {
    return res
      .status(400)
      .send({ error: true, message: "Please insert ExerciseID" });
  }
  let sql_increment =
    "UPDATE patientdetails " +
    "SET TotalExerciseCompleted = TotalExerciseCompleted + 1" +
    " WHERE patient_username= '" +
    patient_username +
    "' AND ExerciseID= '" +
    ExerciseID +
    "' ;";

  dbConn.query(sql_increment, function(error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, message: "Successful!" });
  });
});

//view Exercise Completion progress
app.post("/api/Patient/viewExerciseCompletion", function(req, res) {
  let patient_username = req.body.patient_username;
  console.log(patient_username);
  if (!patient_username) {
    return res
      .status(400)
      .send({ error: true, message: "Please insert username" });
  }
  let sql_complete =
    "SELECT ExerciseID, TotalExerciseCompleted, TotalExerciseCount-TotalExerciseCompleted AS 'TotalExercisesLeft', (TotalExerciseCompleted/TotalExerciseCount)*100 AS 'ExerciseProgress' " +
    "FROM patientdetails " +
    "WHERE patient_username = '" +
    patient_username +
    "';";
  dbConn.query(sql_complete, function(error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "Here is your exercise completion progress!"
    });
  });
});

//let patients view their Physiotherapist
app.post("/api/Patient/viewPhysiotherapist", function(req, res) {
  let patient_username = req.body.patient_username;
  console.log(patient_username);
  if (!patient_username) {
    return res
      .status(400)
      .send({ error: true, message: "Please insert username" });
  }
  let sql_view =
    "SELECT PhysiotherapistAndPatient.physiotherapist_username, users.name " +
    "FROM users INNER JOIN PhysiotherapistAndPatient ON PhysiotherapistAndPatient.physiotherapist_username = users.username " +
    "WHERE PhysiotherapistAndPatient.patient_username = '" +
    patient_username +
    "';";
  dbConn.query(sql_view, function(error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "Physiotherapist"
    });
  });
});

//let patients view their Caretakers
app.post("/api/Patient/viewCaretaker", function(req, res) {
  let patient_username = req.body.patient_username;
  console.log(patient_username);
  if (!patient_username) {
    return res
      .status(400)
      .send({ error: true, message: "Please insert username" });
  }
  let sql_view =
    "SELECT CaretakerAndPatient.caretaker_username, users.name " +
    "FROM users INNER JOIN CaretakerAndPatient ON CaretakerAndPatient.caretaker_username = users.username " +
    "WHERE CaretakerAndPatient.patient_username = '" +
    patient_username +
    "';";
  dbConn.query(sql_view, function(error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "Caretaker" });
  });
});

//let caretakers view patient details
app.post("/api/Caretaker/viewPatient", function(req, res) {
  let caretaker_username = req.body.caretaker_username;
  if (!caretaker_username) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide your username" });
  }

  let patients =
    "SELECT CaretakerAndPatient.patient_username, users.name FROM CaretakerAndPatient INNER JOIN users ON CaretakerAndPatient.patient_username = users.username WHERE PhysiotherapistAndPatient.caretaker_username ='" +
    caretaker_username +
    "'";

  dbConn.query(patients, function(error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "Patients" });
  });
});

//let caretakers view patients exercise progress
app.post("/api/Caretaker/viewExercise", function(req, res) {
  let patient_username = req.body.patient_username;
  console.log(patient_username);
  if (!patient_username) {
    return res
      .status(400)
      .send({ error: true, message: "Please insert username" });
  }
  let sql_complete =
    "SELECT ExerciseID, TotalExerciseCompleted, TotalExerciseCount-TotalExerciseCompleted AS 'TotalExercisesLeft', (TotalExerciseCompleted/TotalExerciseCount)*100 AS 'ExerciseProgress' " +
    "FROM patientdetails " +
    "WHERE patient_username = '" +
    patient_username +
    "';";
  dbConn.query(sql_complete, function(error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "Here is your patient's exercise completion progress!"
    });
  });
});

//enables users to post a new blog post
app.post('/api/Blog/newPost', function (req, res) {
    let blogging_date = req.body.blogging_date
    let author = req.body.author
    let post_content = req.body.post_content
    let post = req.body
    console.log(post);
    if (!blogging_date) {
        return res.status(400).send({ error: true, message: 'Please insert date' });
       }
    if (!author) {
        return res.status(400).send({ error: true, message: 'Please insert author' });
       }
    if (!post_content) {
        return res.status(400).send({ error: true, message: 'Post is empty' });
       }

    let sql_blogpost = 'CREATE TABLE IF NOT EXISTS BlogPosts (blog_id INT(4) UNIQUE NOT NULL AUTO_INCREMENT, blogging_date VARCHAR(255) NOT NULL, author VARCHAR(255) NOT NULL, post_content VARCHAR(255), PRIMARY KEY (blog_id))';
       dbConn.query(sql_blogpost, post, function (error, results, fields) {
            if (error) throw error;
               })
       dbConn.query('INSERT INTO BlogPosts SET ?', post, function (error, results, fields) {
           if (error) throw error;
           return res.send({ error: false, data: results, message: 'Posted successfully.' });
               })
})

//retrieve blog post based on date
app.post('/api/Blog/getPost', function (req, res) {
    let blog_date = req.body.blog_date
    console.log(blog_date);
    if (!blog_date) {
        return res.status(400).send({ error: true, message: 'Please insert date'});
    }

    dbConn.query('SELECT * FROM BlogPosts WHERE blogging_date=?', blog_date, function(error, results, fields) {
        if(error) throw error;
        return res.send({ error: false, data: results[0], message: 'Posts made on date'});
    });
})
