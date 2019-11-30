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
Install Postman via https://www.getpostman.com/downloads/. This will be used to test the API with the following links:
--  Creating a new user:
 - For new patient: (POST) http://localhost:3000/api/CreateUser/Patient 
 - For new physiotherapist: (POST) http://localhost:3000/api/CreateUser/Physiotherapist 
 - For new caretaker: (POST) http://localhost:3000/api/CreateUser/Caretaker

-- Functionalities for Patient:
 - Patient can see their exercise schedule: (POST) http://localhost:3000/api/Patient/viewExercise
 - When patient completes an exercise, frontend will trigger action to this API for recording: (POST) http://localhost:3000/api/Patient/completeExercise
 - Patient can see exercise completion progress: (POST) http://localhost:3000/api/Patient/viewExerciseCompletion
  - Enables patient to view their physiotherapist: (POST) http://localhost:3000/api/Patient/viewPhysiotherapist
 - Enables patient to view their caretakers: (POST) http://localhost:3000/api/Patient/viewCaretaker

-- Functionalities for Physiotherapist:
 - Allows physiotherapist to view details of a specific patient: (POST) http://localhost:3000/api/Physiotherapist/ViewPatientsDetails 
 - Enables them to add patient into their list: (POST) http://localhost:3000/api/Physiotherapist/addpatient 
 - Enables them to see all patients on their list: (POST) http://localhost:3000/api/Physiotherapist/viewPatients
  - Enables them to see all details of the patients on their list: (POST) http://localhost:3000/api/Physiotherapist/viewAllMyPatientsDetails
 - Allows physiotherapist to update patient's exercise: (POST) http://localhost:3000//api/Physiotherapist/UpdateExercise 
 
-- Functionalities for Caretaker:
 - Add patient into caretaker's list : (POST) http://localhost:3000/api/Caretaker/addpatient
 - Lets caretakers view their patient's details: (POST) http://localhost:3000/api/Caretaker/viewPatient
 - Allows caretakers to see their patients' exercise progress: (POST) http://localhost:3000/api/Caretaker/viewExercise
 - Enables them to see details on specific patient: (POST) http://localhost:3000/api/Caretaker/ViewPatientsDetails
