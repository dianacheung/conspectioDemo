class ConspectioConnection {
  init(callback) {
    conspectio.socket.emit('getEventList');

    conspectio.socket.on('sendEventList', (eventList) => {
      console.log('EVENT LIST:', eventList);
      callback(eventList);
    });
  }
}

module.exports = ConspectioConnection;