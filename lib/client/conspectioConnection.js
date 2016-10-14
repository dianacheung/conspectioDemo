const setupGetUserMedia = require('./setupGetUserMedia.js');
const broadcasterRTCEndpoint  = require('./broadcasterRTCEndpoint.js');
const viewerRTCEndpoint  = require('./viewerRTCEndpoint.js');

class ConspectioConnection {
  constructor(eventId, role, domId, viewHandler, options) {
    this.eventId = eventId;
    this.role = role;
    this.domId = domId;
    this.viewHandler = viewHandler;
    this.options = options;
    this.stream = null;
  }

  start() {
    if(this.role && this.role === 'broadcaster') {
      
      // emit message to server
      conspectio.socket.emit('sendEventTag', this.eventId);

      const that = this;

      // invoke setupGetUserMedia
      setupGetUserMedia(this.domId, (stream) => {
        // store a reference of MediaStream
        that.stream = stream;

        // setup broadcasterRTCEndpoint - passing in the MediaStream
        broadcasterRTCEndpoint(stream);
      });

    } else if(this.role && this.role === 'viewer') {
      // invoke viewerRTCEndpoint - setup appropriate socket events relating to webRTC connection
      viewerRTCEndpoint(this.eventId, this.domId, this.viewHandler);
    }
  }

  stop() {

    if(this.role && this.role === 'broadcaster') {
      // stop stream
      this.stream.getTracks()[0].stop();

      // emit message to server
      conspectio.socket.emit('removeBroadcaster', this.eventId);
    } else if(this.role && this.role === 'viewer') {

    }

    // for each endpoint in connections{}, close it out
    for (var conspectioBroadcasterId in conspectio.connections){
      conspectio.connections[conspectioBroadcasterId].removeStreamWrapper();
      conspectio.connections[conspectioBroadcasterId].closeWrapper();
      delete conspectio.connections[conspectioBroadcasterId];
    }
  }

}

module.exports = ConspectioConnection;