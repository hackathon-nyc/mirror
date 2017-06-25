import express from 'express';
import { join, resolve } from 'path';
import middleware from './config/middleware';
import routes from './config/routes';
import _ from 'lodash';
import http from 'http';
import Debug from 'debug';
import socketIO from 'socket.io';

const debug = Debug('server');
const app = express();
const server = http.Server(app);
const io = socketIO(server);

middleware(app);
routes(app);

app.use(express.static(join(`${__dirname}/../build`)));
app.use(express.static(join(`${__dirname}/../public`)));

app.get('/*', (request, response) => {
  response.sendFile(resolve(`${__dirname}/../public/index.html`));
});

//sockets
const DEFAULT_PEER_COUNT = 2;
io.on('connection', function (socket) {
  console.log('SOCKET: ', socket.id)

  io.on('JOIN CHAT', (room) => {
    
  })
});

let port = process.env.PORT || 3000;
server.listen(port, (err) => {
  console.log("Listening on port " + port);
});
