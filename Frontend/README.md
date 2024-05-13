
# Student Database CRUD

STUDENT DATABASE is a MERN based CRUD application. Using this app you can perform 4 basic operations such as Create , update , read and delete operations on a simple Student database.

## Appendix

### /Backend : Contains data related to backend.
- /db : Contains Configuration and User model.
- /Routes : Contains API routes and Swagger docs.
- /test : Contains Unit tests using Chai and mocha.
- /.env : Contains PORT and mongodb connection string. 
- /index.js : Contains Swagger config and Express app.
- /seed.js : Contains script to seed data.

### /Frontend : React App

- /src : Contains Components , assets and Css.
- /.env : Contains Firebase Config , React app PORT
## Run Locally:

- Make sure you have Nodejs and mongoDb installed in your computer (Mongo db compass is recommended).
- In mongodb copy the connection string and paste it inside the Backend/.env file in MONGODB_URI , make sure to follow the syntax.
- I am using default 5000 port you can choose according to your machine.
- Click on connect in mongodb compass to run the project.
- Inside tha backend folder run command: 
```
nodemon
```

### Final Steps:

Clone the project

```bash
  git clone https://github.com/27Shri03/Student-Database.git
```

Go to the project directory

```bash
  cd Student-Database
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Usage/Examples

### Seed Script:
Using this file you can populate your database so that you can test API endpoints using Swagger API testing and work on the data initially.

- In backend folder run this command:

```
node seed.js
```
On frontend , log in with the given email and password :
- EMAIL : test@gmail.com
- PASSWORD: test123

### Swagger API testing:

After logging in with any account we can perform swagger API testing. Click on the Swagger API testing button to proceed with testing.





## Running Tests

To run tests, run the following command in the backend folder

```bash
  npm test
```

