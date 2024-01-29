const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.cubuowl.mongodb.net/chatAppMern?retryWrites=true&w=majority`)
.then(()=>(console.log('connected to database')))
