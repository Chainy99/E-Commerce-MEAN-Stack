require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/opzdb'
var bodyParser = require('body-parser')
const app = express()
var cors = require('cors')
const socketIO = require('socket.io');




const createServer = require("http").createServer;

const Server = require("socket.io").Server;

const fileURLToPath = require("url").fileURLToPath;

const dirname = require("path").dirname;

const onSocket = require("./socket.js");




var appRoutes = require("./routes/appRoutes")
var adminRoutes = require('./routes/adminRoute')

// process.env.PORT hoy to e else 3000
const PORT = process.env.PORT || 3000

// some useful library
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

 
// data base connection
mongoose.Promise=global.Promise
mongoose.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true})
const con = mongoose.connection
con.on('open', () => {
    console.log("database connected");
})



// for testing purposr
app.get('/', (req, res) => {
    res.send("Hello chainy from Serverrrrrrrr")
})



// route configure
app.use('/', appRoutes)
app.use('/admin', adminRoutes)










const path = require('path');
const filePath = path.resolve(__dirname);


const fileDir = __dirname;




const httpServer = createServer(app);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/frontend/src/app/ind/chat/chat.component.html");
});

app.use(express.static(__dirname + "/frontend/src/app/ind/chat"));

const io = socketIO(httpServer);
onSocket(io);

const port = process.env.PORT || 8080;
httpServer.listen(port, () => console.log(`Listening on port ${port}...`));



