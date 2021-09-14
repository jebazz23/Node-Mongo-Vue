const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const passport = require('passport');

// Start app
const app = express();

// Middlewares

// Json body middlewares
app.use(express.json());

// Form Data Middleware
app.use(express.urlencoded({ extended: false }));

// Cors Middleware
app.use(cors());

// Seting up the static directory
app.use(express.static(path.join(__dirname, 'public')));

//Use the passport Middleware
app.use(passport.initialize());

//Bring in the Passport Strategy
require('./app/config/passport')(passport);

// Bring in the Database Config and connect with the database
const db = require('./app/config/keys').mongoURL;
mongoose.connect(db, {
    useNewUrlParser: true
}).then(() => {
    console.log(`Database connected successfully ${db}`)
}).catch(err => {
    console.log(`Unable to connect with the database ${err}`)
});


// app.get('/', (req, res) => {
//    return res.send('<H1>Hello World</H1>')
// })

// Bring in the Users route
const users = require('./app/routes/api/users');
app.use('/api/users', users);


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})