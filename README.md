# Team Zest: Dr.Rehab


#### Getting Started
To get the Node server running locally:
- Clone this repo
- `npm install` to install all required dependencies

#### Dependencies:
- async
- body-parser
- cors
- express
- fs
- multer
- mysql
- nodemon
- tedious

#### Using POSTMAN to Obtain JSON Output
1. Install Postman via https://www.getpostman.com/downloads/. This will be used to test the API with the following links:
--  Creating a new user:
In JSON format - 
{ "username": "dewi_123"     ,  
  "name": "dewi"             ,
  "usertype": "Patient"      ,
  "email_address": "123.com" ,
  "password": "1234"         }
 - For new patient: (POST) http://localhost:3000/api/CreateUser/Patient 
 - For new physiotherapist: (POST) http://localhost:3000/api/CreateUser/Physiotherapist 
 - For new caretaker: (POST) http://localhost:3000/api/CreateUser/Caretaker

2. Functionalities for Patient:
 - Patient can see their exercise schedule: (POST) http://localhost:3000/api/Patient/viewExercise
 BODY: { "patient_username": "dewi_123"}
 - When patient completes an exercise, frontend will trigger action to this API for recording: (POST) http://localhost:3000/api/Patient/completeExercise
 BODY: { "patient_usernname": "dewi_123",
         "ExerciseID: "Sit-Ups" }
 - Patient can see exercise completion progress: (POST) http://localhost:3000/api/Patient/viewExerciseCompletion
 BODY: { "patient_username": "dewi_123"}
 - Enables patient to view their physiotherapist: (POST) http://localhost:3000/api/Patient/viewPhysiotherapist
 BODY: { "patient_username": "dewi_123"}
 - Enables patient to view their caretakers: (POST) http://localhost:3000/api/Patient/viewCaretaker 
 BODY: { "patient_username": "dewi_123"}


3. Functionalities for Physiotherapist:
 - Allows physiotherapist to view details of a specific patient: (POST) http://localhost:3000/api/Physiotherapist/ViewPatientsDetails 
 - Enables them to add patient into their list: (POST) http://localhost:3000/api/Physiotherapist/addpatient 
 BODY: { "patient_username": "dewi"         ,
         "physiotherapist_username": "bob"  ,
         "Startdate": 2020-12-31            ,
         "LastVisitDate": 2019-11-28        ,
         "STATUS": 1                        }
 - Enables them to see all patients on their list: (POST) http://localhost:3000/api/Physiotherapist/viewPatients
 BODY: { "physiotherapist_username" : "bob" }
 - Enables them to see all details of the patients on their list: (POST) http://localhost:3000/api/Physiotherapist/viewAllMyPatientsDetails
 BODY: { "physiotherapist_username" : "bob" }
 - Allows physiotherapist to update patient's exercise: (POST) http://localhost:3000//api/Physiotherapist/UpdateExercise 
 BODY: { "patient_username": "dewi" ,
         "ExerciseID": "Sit-Ups"    ,
         "ExerciseDate": 2020-03-15 ,
         "TotalExerciseCount": 3    }
 
4. Functionalities for Caretaker:
 - Add patient into caretaker's list : (POST) http://localhost:3000/api/Caretaker/addpatient
 BODY: { "patient_username":   "bob"       ,
         "caretaker_username": "dewi"      }
 - Lets caretakers view their patient's details: (POST) http://localhost:3000/api/Caretaker/viewPatient
 BODY: { "caretaker_username" : "tim" }
 - Allows caretakers to see their patients' exercise progress: (POST) http://localhost:3000/api/Caretaker/viewExercise 
 BODY: { "patient_username": "dewi_123"}
 - Enables them to see details on specific patient: (POST) http://localhost:3000/api/Caretaker/ViewPatientsDetails 
 BODY: { "username": "dewi_123"}

 
 
 __________________
 CHECK PASSWORD
 http://localhost:3000/api/CheckPassword  (link)
 (JSON body)  { "username":      ,
                "password":      }
