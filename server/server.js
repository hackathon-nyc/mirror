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
  console.log('SOCKET: ', socket)
  // debug('Connection with ID:', socket.id);
  // var peersToAdvertise = _.chain(io.sockets.connected)
  //   .values()
  //   .without(socket)
  //   .sample(DEFAULT_PEER_COUNT)
  //   .value();
  // debug('advertising peers', _.map(peersToAdvertise, 'id'));
  // peersToAdvertise.forEach(function(socket2) {
  //   debug('Advertising peer %s to %s', socket.id, socket2.id);
  //   socket2.emit('peer', {
  //     peerId: socket.id,
  //     initiator: true
  //   });
  //   socket.emit('peer', {
  //     peerId: socket2.id,
  //     initiator: false
  //   });
  // });

  socket.on('signal', function(data) {
    var socket2 = io.sockets.connected[data.peerId];
    if (!socket2) { return; }
    debug('Proxying signal from peer %s to %s', socket.id, socket2.id);

    socket2.emit('signal', {
      signal: data.signal,
      peerId: socket.id
    });
  });
});

let port = process.env.PORT || 3000;
server.listen(port, (err) => {
  console.log("Listening on port " + port);
});
