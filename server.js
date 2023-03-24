import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcryptjs';
import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleImage from './controllers/image.js';
import handleImageRecognition from './controllers/imageRecognition.js';

const db = knex ({
    client: 'pg',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl : { rejectUnauthorized: false },
        host : process.env.DATABASE_HOST,
        port : 5432,
        user : process.env.DATABASE_USER,
        password : process.env.DATABASE_PW,
        database : process.env.DATABASE_DB
    }
});

const app = express();

app.use(bodyParser.json());

app.use(cors())

app.get('/', (req, res)=> {
    res.send(db.select('*').from('users'));
})

app.post('/signin', (req, res) => {handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)})

app.put('/image', (req, res) => {handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {handleImageRecognition(req, res)})


app.listen(process.env.PORT || 3001, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
