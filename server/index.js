const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

const post = require('./routes/v1/api/post');
app.use('/v1/api/post',post);

//handle production
if(process.env.NODE_ENV === 'produnction'){
  //static folder
  app.use(express.static(__dirname + '/public'));

  //handle spa
  app.get(/.*/,(req,res)=>res.sendFile(__dirname + 'public/index.html'));
}

// server 
app.listen(port,()=>{
  console.log('server active port 5000 ')
})


