require('dotenv').config();
const { mongoConnection } = require('./mongo')
const bodyParser = require('body-parser')

const express = require('express');
const cors = require('cors');


const app = express();

//---> Mongo
mongoConnection();

//--->CORS

app.use(cors());


app.use( express.json() );

//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());

//---> Routes:
app.use('/api/employee', require('./routes/employees'));

//---> Listening petitions
app.listen(process.env.PORT, ()=>{
    console.log(`Server on port: ${process.env.PORT}`)
});




