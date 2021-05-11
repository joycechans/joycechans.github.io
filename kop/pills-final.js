// FOLLOW THE COMMENTS STEP BY STEP
// log in to you your Airtable account
// make sure you have a base set up with at least one table with data inside it
// go to Account settings
// click the generate API key button
// copy and paste it into line 13 below
// then go to this link https://airtable.com/api?utm_source=google&utm_medium=cpc&utm_extra5=kwd-826617918193&utm_extra2=936407691&utm_extra10=110555501161&creative=465926015426&device=c&cx=us&targetid=kwd-826617918193&campaignid=936407691&adgroupid=110555501161&utm_campaign=brand_creator&utm_content=bofu_freetrial&gclid=Cj0KCQjwmIuDBhDXARIsAFITC_5ScBkfOcfy68SuLtNsXhLoTp8JoYwFlBuOK6yDpmKnA_eCAXZ3kKsaAptkEALw_wcB
// select your base
// copy and paste the base ID into line 14 below

// the next two lines are calling the Airtable API!!
var Airtable = require("airtable");
console.log(Airtable);
var base = new Airtable({ apiKey: "keyTHYYWalZIz8RMc" }).base(
  "appjlvoeBcEeNKKQs"
);

// create an empty array for all of your items to go into
let allItems = [];

//array of draggable pills. each item will store the element and shape of each pill
const PILLS = [];
// array for each pill element
let pillElementsArray = [];

// inside the () after base put the name of YOUR spreadsheet
base('pills').select({}).eachPage(function page(tableItems, fetchNextPage) {
  tableItems.forEach(function(item) {
    // push each item received into the allItems array on line 16
    allItems.push(item);
  });


  // if there is another page of items, get those too
  fetchNextPage();

}, function done(err) {
  if (err) { console.error(err); return; }

  // all items received, no errors!!
  // console log the allItems array, you should see all of your data in there now.
  // console.log(allItems);

  // now, call a new function to do stuff with your data and pass the allItems array into it
  setTable(allItems);
  // setTable(allItems.slice(0, 10))
  makePillsDraggable(PILLS);
});

// make a container div and append it to the body
// this way we can append all of our items to a div which we can style later
let container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);


function setTable(allItems) {

  // run a forEach loop on your array, with each item
  // then make a new HTML element and position it somewhere on the page 
  allItems.forEach(function(item) {
    // store the name of the item (from your spreadsheet) into a variable
    let name = item.fields.items;
    // store the image for the item into a variable
    let imageUrl = item.fields.images[0].url;

    let itemImage = document.createElement('img');
    itemImage.src = imageUrl;
    itemImage.classList.add(item.fields.shape);
    // since were in the for each loop here, it will call getRandomPlace for each image, over and over
    let randomPointOnPage = getRandomPlace();
    // the function returns an array [randomHorizontal, randomVertical], so lets console log the first and the second item in the array
    console.log(randomPointOnPage[0],randomPointOnPage[1]);
    // the add a position to each image and a left and top value with the randomHorizontal=[0] and the randomVertical= [1]
    itemImage.style.position = "absolute";
    itemImage.style.left = `${randomPointOnPage[0]}px`;
    itemImage.style.top = `${randomPointOnPage[1]}px`;

    // drag
    itemImage.addEventListener('dragstart',(event) => {
      event.preventDefault();
    });

    // push image and shape of pills to PILLS array
    // also define some properties that will be used in the dragging function
    PILLS.push({
      image: itemImage,
      shape: item.fields.shape.join(''),
      positions: {
        initialX: null,
        InfinitY: null,
        currentX: null,
        currentY: null,
        xOffset: 0,
        yOffset: 0
      }
    });

    // container.appendChild(itemImage);
    pillElementsArray.push(itemImage);

  })
  setTenRandomPills();
}

// FUNCTION: display only ten random pills on the screen at a time
function setTenRandomPills() {
  console.log("set ten random pills");

  for (var i=0; i<10; i++) {
    let randomNumber = Math.floor(Math.random() * pillElementsArray.length)
    let randomPill = pillElementsArray[randomNumber];
    console.log(randomPill);
    container.appendChild(randomPill);
  }
}

// FUNCTION: randomize position
function getRandomPlace() {
  let container = document.querySelector(".container");
	var x = container.clientWidth;
	var y = container.clientHeight;
  // console.log(x, y);
	var randomHorizontal = Math.floor(Math.random()*x);
	var randomVertical = Math.floor(Math.random()*y);
	return [randomHorizontal, randomVertical];
}

// FUNCTION: draggable img
// pills will disappear if they are dropped close to their corresponding shape. modify this behavior in dragEnd()
function makePillsDraggable(dragItems) {
  const container = document.body;
  // these these are tolerances for dropping the pills into their shapes. higher values mean you can drop them further away and it'll still count note that this method relies on the top-left corner for positioning, so if you want to be more exact you'll have to find a way to use the width and height of the elements to grab the coordinates from the center
  const dropThresholds = {
    x: 50,
    y: 50
  };

  let active = false;
  let activeItem;

  container.addEventListener('touchstart', dragStart, false);
  container.addEventListener('touchend', dragEnd, false);
  container.addEventListener('touchmove', drag, false);
  container.addEventListener('touchcancel', dragEnd, false);
  container.addEventListener('mousedown', dragStart, false);
  container.addEventListener('mouseup', dragEnd, false);
  container.addEventListener('mousemove', drag, false);

function dragStart(event) {
  for (let i = 0; i < dragItems.length; i++) {
    if (event.target === dragItems[i].image) {
      active = true;
      activeItem = dragItems[i];
      break;
    }
  }
  if (activeItem) {
	  if (event.type === 'touchstart') {
	    activeItem.positions.initialX = event.touches[0].clientX - activeItem.positions.xOffset;
	    activeItem.positions.initialY = event.touches[0].clientY - activeItem.positions.yOffset;
	  } else {
	    activeItem.positions.initialX = event.clientX - activeItem.positions.xOffset;
	    activeItem.positions.initialY = event.clientY - activeItem.positions.yOffset;
	  }
  }
}

function dragEnd(event) {
  if (activeItem) {
		activeItem.positions.initialX = activeItem.positions.currentX;
		activeItem.positions.initialY = activeItem.positions.currentY;
		active = false;

		// select the shape that matches the pill being dragged and get its position
		const shapeContainerPosition = document.querySelector(`.shape-${activeItem.shape}`).getBoundingClientRect();

		// get positions of the pill being dragged
		const finalImagePosition = activeItem.image.getBoundingClientRect();

		// this will remove the image from the document if you drop the pill inside the right shape
		if (Math.abs(finalImagePosition.top - shapeContainerPosition.top) <= dropThresholds.x
		&& Math.abs(finalImagePosition.left - shapeContainerPosition.left) <= dropThresholds.y) {
			activeItem.image.remove();
		}
	}
  
// Sucess Button
if (dragItems.every((item) => !document.body.contains(item.image))) {

  container.removeEventListener('touchstart', dragStart, false);
  container.removeEventListener('touchend', dragEnd, false);
  container.removeEventListener('touchmove', drag, false);
  container.removeEventListener('touchcancel', dragEnd, false);
  container.removeEventListener('mousedown', dragStart, false);
  container.removeEventListener('mouseup', dragEnd, false);
  container.removeEventListener('mousemove', drag, false);

  alert('Your most recent trial of pills were not the best match for you. Another batch of pills will be prescribed to you. How about you test them out too?');
}
}

  function drag(event) {
  if (active) {
    event.preventDefault();
    if (event.type === 'touchmove') {
      activeItem.positions.currentX = event.touches[0].clientX - activeItem.positions.initialX;
      activeItem.positions.currentY = event.touches[0].clientY - activeItem.positions.initialY;
    } else {
      activeItem.positions.currentX = event.clientX - activeItem.positions.initialX;
      activeItem.positions.currentY = event.clientY - activeItem.positions.initialY;
    }
    activeItem.positions.xOffset = activeItem.positions.currentX;
    activeItem.positions.yOffset = activeItem.positions.currentY;
    activeItem.image.style.transform = `translate(${activeItem.positions.currentX}px, ${activeItem.positions.currentY}px)`;
    }
  }

// Success Button

var okayBtn = "Try again";

if(document.getElementById) {
    window.alert = function(sucessBtn) {
        createCustomAlert(sucessBtn);
    }
}

function createCustomAlert(sucessBtn) {
    d = document;

    if(d.getElementById("modalContainer")) return;

    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";

    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
    alertObj.style.visiblity="visible";

    msg = alertObj.appendChild(d.createElement("p"));
    msg.innerHTML = sucessBtn;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode(okayBtn));
    btn.href = "#";
    btn.focus();
    btn.onclick = function() { removeCustomAlert();return false; }
    btn.onclick = function() { refreshPage();return false; }

    alertObj.style.display = "block";

}

function removeCustomAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}

function refreshPage(){
  window.location.reload();
} 

// --------- //

// MODAL: about button

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}
