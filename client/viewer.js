// setup viewer.html dom and event handlers
function setupViewerDom() {
  const parentElement = $('#conspectioViewerContainer').addClass('row viewergridrow');

  // setup the eventName DOM element and populate with url query value
  const eventName = $('<h1></h1>').attr(
    {
      'id': 'eventName'
    }
  );

  parentElement.append(eventName);

  const eventTag = window.location.search.substring(5);
  $('#eventName').html(eventTag);

  const videosDiv = $('<div></div>').attr(
    {
      'id': 'videosDiv'
    }
  );

  parentElement.append(videosDiv);

  return eventTag;
}

function handleNoMoreBroadcasters(destination) {
  console.log('redirecting viewer to events page');
  window.location.href = destination;
}

var eventTag = setupViewerDom();

// expected args - eventId, role, domId, viewHandler, RTCPeerConnection options
var conspectioConnectionObj = new conspectio.ConspectioConnection(eventTag, 'viewer', 'conspectioViewerContainer', handleNoMoreBroadcasters, null);
conspectioConnectionObj.start();



