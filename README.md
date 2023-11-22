# Note-Keeper

The main features of the project include:

1. User Management:
   - User Registration: Users can create an account by providing their phoneNumber and a secure password.
   - User Authentication: The application ensures that only authenticated users can access their notes.
   
2. Note Management:
   - Create Note: Users can create new notes by providing a title and the text of the note.
   - Edit Note: Users can edit the title and text of their existing notes.
   - Delete Note: Users can delete any note they no longer need.
   - View Note: Users can view the details of each note, including the title, text, and date of creation.
   - View just one Note: Users can view the details of one note, including the title, text, and date of creation.

# Overview
 
 - in this api you can register an account and take your notes and even deleting them if you want
 - and update and get all note with pagination notes and get just one of your notes 

# Installation

1. first should clone the repo
2. Open Terminal , and write : `npm i` after that create a `.env` file in the root directory
3. add environment variables :
`PORT` the port number that you want to start the api on
`USER` for login to database connection 
`PASSWORD` password of user for database connection 
`HOST` like `localHost`
`DATABASE` name of database 
`DIALECT` is "MYSQL"
`PORT_DB` port for connection with database mysql
`CHARSET` = "utf8mb4"
`COLLATE` = "utf8mb4_general_ci"
`SECRET_KEY`  the private key to generate tokens for users
you can use the
`JWT_EXPIRES_IN`  to generate a key for expires like  90d

# Usage

in this api there is the following endpoints:
1. `POST` /auth/signup : to signUp a new account
   you will need to send the following  information as a json  
   name , gender , phoneNumber , username , password , tokenDevice 

2. `POST` auth/login: to log in to your account
   you will need to send the following information as a json
    username, password ,tokenDevice
3. `GET` /auth/logout : to logout form your account for this device
4. `POST` /note/create : to create new note for this user  with title and text 
5. `GET` /note/all?page=1&size=1 : to get all your notes with pagination data with page: number of page your want to show  , size :count element in this page 
6. `GET` /note/getById/id: to get one of your note with the id
7. `DELETE` /note/delete/id: to delete one of you note with the id
8. `PUT` /note/update/id: to update one of you note with the id

# Authentication

for the authentication I used json web token JWT ,  Bearer Token when you login or register an account you will get a token in the response header "authorization" use the same header to send the token with your requests for the notes
