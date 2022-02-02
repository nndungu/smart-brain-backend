const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
// Export this to a different file.
// Use an env file for variables.
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'ec0rp',
        password: '@rWoot9b#27',
        database: 'smart_brain'
    }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

// create a router file that takes all these definitions.
app.get('/', (_req, res)=> { res.send(db.users) })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})


app.listen(3600, () => {
    console.log('app is running on port 3600');
})