// load the conspectio library object unto the window object
if(! window.conspectio) {
  const conspectio = {};

  // require in webrtc-adapter for shimming
  require('webrtc-adapter');

  // require in socket.io-client
  const io = require('socket.io-client');

  // instantiate socket
  conspectio.socket = io();

  // conspectio.broadcasterStream = null;
  // conspectio.broadcasterEventTag = null;
  // conspectio.initiator = null;
  conspectio.connections = {};
  // conspectio.webRTCConfig = {};

  // import module that handles broadcasterSetup
  // conspectio.broadcasterSetup = require('./broadcasterSetup');
  // import the ConspectioConnection module
  conspectio.ConspectioConnection = require('./conspectioConnection');

  // import the ConspectioManager module
  conspectio.ConspectioManager = require('./conspectioManager');

  // import module that handles eventsSetup
  conspectio.eventsSetup = require('./eventsSetup');

  // import module that handles viewerSetup
  conspectio.viewerSetup = require('./viewerSetup');

  window.conspectio = conspectio;
} else {
  console.log('Unable to load conspectio library');
}
