// setup for broadcaster
// conspectio.broadcasterSetup();

var conspectioConnectionObj;
// add back in event handlers
// setup dom event handlers
function sendEventTag() {
  console.log('sendEventTag invoked');
  const eventTag = $('#eventTag').val();

  // // store eventTag value to conspectio.broadcasterEventTag
  // conspectio.broadcasterEventTag = eventTag;

  if(eventTag.length) {
    $('#startButton').prop('disabled', true);
    $('#stopButton').prop('disabled', false);

    // required args: eventId, role, domId, viewHandler, options
    conspectioConnectionObj = new conspectio.ConspectioConnection(eventTag, 'broadcaster', 'broadcasterStream', null, null);
    console.log('conspectioConnectionObj', conspectioConnectionObj);
    conspectioConnectionObj.start();
    console.log('conspectioConnectionObj after start()', conspectioConnectionObj);

    // TODO: possible to further decouple with socket?
    // conspectio.socket.emit('sendEventTag', eventTag);

    // invoke setupGetUserMedia
    // setupGetUserMedia();

  } else {
    alert('please enter a tag name to start streaming');
  }
};

function stopStream() {
  console.log('stopStream invoked');
  // conspectio.broadcasterStream.getTracks()[0].stop();
  $('#startButton').prop('disabled', false);
  $('#stopButton').prop('disabled', true);
  // conspectio.socket.emit('removeBroadcaster', conspectio.broadcasterEventTag);
  $('#broadcastMsg').empty();
  $('#broadcastMsg').html(`<p>You have stopped streaming</p>`);

  conspectioConnectionObj.stop();

};

$('#startButton').on('click', sendEventTag);
$('#stopButton').on('click', stopStream); 