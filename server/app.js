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

let gfs;
let storage;
let upload;
const conn = mongoose.connection;
conn.once('open', function () {
  gfs = Grid(conn.db, mongoose.mongo);

  // Setting up the storage element
  storage = GridFsStorage({
    db: gfs.db,
    filename: (req, file, cb) => {
      const date = Date.now();
      cb(null, file.fieldname + '-' + date + '.');
    },
    metadata: function (req, file, cb) {
      cb(null, { originalname: file.originalname });
    },
    root: 'ctFiles'
  });

  // Multer configuration for single file uploads
  upload = multer({
    storage: storage
  }).single('photo');
})

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

app.post('/api/file', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    res.json({ error_code: 0, error_desc: null, file_uploaded: true, image: req.file.filename });
  });
});

app.get('/api/file/:filename', (req, res) => {
  gfs.collection('ctFiles');
  gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
    if (!files || files.length === 0) {
      return res.status(404).json({
        responseCode: 1,
        responseMessage: "error"
      });
    }
    // create read stream
    var readstream = gfs.createReadStream({
      filename: files[0].filename,
      root: "ctFiles"
    });
    // set the proper content type
    res.set('Content-Type', files[0].contentType)
    // Return response
    return readstream.pipe(res);
  });
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
