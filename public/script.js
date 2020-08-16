if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', String(Math.random()));
}

const userId = localStorage.getItem('userId');

async function handleClick(event) {
  console.log(event);
  const whatTheUserClicked = event.target.tagName;
  const pageX = Math.round(event.pageX);
  const pageY = Math.round(event.pageY);
  const theClosestTrackingId = event.path.find(
    item => item.dataset.trackingid !== undefined
  );
  console.log(theClosestTrackingId);
  const timeStamp = Math.round(event.timeStamp);
  const url = '/clicks';
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      pageX,
      pageY,
      eventTarget: whatTheUserClicked,
      eventPath: theClosestTrackingId.dataset.trackingid,
      timeStamp,
      userId,
    }),
  });
}

window.addEventListener('click', handleClick);
