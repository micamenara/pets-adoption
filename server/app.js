'use strict'

// Dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
const Grid = require('gridfs-stream');


//Connect mongoose to our database
mongoose.connect(config.database, {useNewUrlParser: true } );

//Declaring Port
const port = 3000;


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './src/assets/img')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

//will be using this for uplading


//Initialize our app variable
const app = express();

//Middleware for CORS
app.use(cors());

//Middlewares for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.post('/api/file', upload.single('file'), function(req, res) {
  console.log('storage location is ', req.hostname +'/' + req.file.path);
  return res.send(req.file);
});

//Routing all HTTP requests
const userRoutes = require('./routes/user');
const petRoutes = require('./routes/pet');
app.use('/api/user', userRoutes);
app.use('/api/pet', petRoutes);

//Listen to port 3000
app.listen(port, () => {
  console.log(`Starting the server at port ${port}`);
});
