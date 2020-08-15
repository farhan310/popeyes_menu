if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', String(Math.random()));
}

const images = document.querySelectorAll('img');
const h4 = document.querySelectorAll('h4');
const h5 = document.querySelectorAll('h5');
const header = document.querySelectorAll('header');
const button = document.querySelectorAll('button');
const section = document.querySelectorAll('section');
const footer = document.querySelectorAll('footer');
const pTag = document.querySelectorAll('p');
const aTag = document.querySelectorAll('a');
const body = document.querySelectorAll('body');

const userId = localStorage.getItem('userId');

async function handleClick(event) {
  const whatTheUserClicked = event.target.innerText;
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
      eventPath: theClosestTrackingId,
      timeStamp,
      userId,
    }),
  });
}

images.forEach(image => image.addEventListener('click', handleClick));
h4.forEach(header4 => header4.addEventListener('click', handleClick));
h5.forEach(header5 => header5.addEventListener('click', handleClick));
header.forEach(mainHeader => mainHeader.addEventListener('click', handleClick));
button.forEach(headerButtons =>
  headerButtons.addEventListener('click', handleClick)
);
pTag.forEach(tag => tag.addEventListener('click', handleClick));
aTag.forEach(linkTag => linkTag.addEventListener('click', handleClick));
section.forEach(sectionTag =>
  sectionTag.addEventListener('click', handleClick)
);
footer.forEach(bottomFooter =>
  bootomFooter.addEventListener('click', handleClick)
);
body.forEach(bodyTag => bodyTag.addEventListener('click', handleClick));
