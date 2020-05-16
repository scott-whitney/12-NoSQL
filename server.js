const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes')

const PORT = process.env.PORT || 3001;

const app = express();

const path = require('path');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

app.listen(PORT);