
require('dotenv').config();
const Server = require('./models/server');


//console.log('Hola mundo');

const server = new Server();



server.listen();


