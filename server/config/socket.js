const Table = require("../models/restaurant.model");
module.exports = (server, url) => {


  const io = require('socket.io')(server, { path: url });


  io.on("connection", (socket) => {
    console.log("Connect");

    socket.on('subscribe', (table) => {
      console.log('Tablesssss', table)
      console.log('joining room', `${table.id} ${table.num}`);
      socket.join(`${table.id} ${table.num}`);
    });

    socket.on('send message', ({ table, msg }) => {

      console.log(msg)
      console.log('sending table post', `${table.id} ${table.num}`);

      io.sockets.in(`${table.id} ${table.num}`).emit('subasta!', {
        message: msg.message || msg
      });
    })







  })
}