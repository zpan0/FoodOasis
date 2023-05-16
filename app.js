const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar_menu');

menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

const checkboxes = document.querySelectorAll('input[type="checkbox"]')
//step 1: keep track of last checked box
//step 2: is shiftkey down?
    //if yes, check everything in btw
      //loop through all boxes again and check all in between
    //if no, just check current box

let lastChecked; //keep track of last checked box

function handleCheck(e){
  let inBetween = false; 
  if (e.shiftKey === true){
    checkboxes.forEach(item => {
       //keep track of in between boxes by toggling inBetween to be true for all boxes in between, and then toggle it back to false after. If you dont understand, go through line by line what happen to each box when click and shift.
       if (item === this || item === lastChecked){
         inBetween = !inBetween;
       }
       //check every box in between
       if (inBetween){
         item.checked = true;
       }
    })
  }
  
  lastChecked = this //keep track of last checked box
}

checkboxes.forEach(item => item.addEventListener('click', handleCheck));

mapboxgl.accessToken = 'pk.eyJ1IjoienBhbjMiLCJhIjoiY2xha2Yzd3RvMGxvZzN5bGYydGpsZGNjOSJ9.JbRKjmgYO_jvMrQLVzEMSQ';
// coordinates data json
var geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-84.388168, 33.748783]
      },
      properties: {
        title: 'Georgia State Capitol Oasis',
        description: 'Meats, Drinks, Vegetables, Dairy'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: 'San Fran Oasis',
        description: 'Vegetables, Dairy'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-84.3963, 33.7756]
      },
      properties: {
        title: 'GA Tech Lame',
        description: 'Meats, Drinks'
      }
    }
  ]
};
geojson.features.push({
  type: "Feature", 
  geometry: {
    type:'Point',
    coordinates: [-84.389303,33.756631]
  },
  properties: {
    title: 'Aderhold Oasis',
    description: 'Fruits, Vegetables, Dairy'
  }
}); 

// map
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-96, 37.8],
  zoom: 3
});
// Geocoder
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl
});
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,                
    })
);
// add controls to map 
map.addControl(new mapboxgl.NavigationControl());
// add markers to map
for (const feature of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';
  // make a marker for each feature and add it to the map
  new mapboxgl.Marker(el)
  .setLngLat(feature.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(
        `
        <h3>${feature.properties.title}</h3>
        <p>${feature.properties.description}</p>
        <a href="http://maps.google.co.uk/maps?q=${feature.geometry.coordinates[1]},${feature.geometry.coordinates[0]}" class="gpsBtn">GPS</a>
        `
      )
  )
  .addTo(map);
}

// create marker w/out json
newMarker();
function newMarker(){
  const bb = document.createElement('div');
  bb.className='marker';
  new mapboxgl.Marker(bb)
  .setLngLat([139.6503, 35.6762])
  .setPopup(
  new mapboxgl.Popup({ offset: 25})
      .setHTML(
      `<h3>Tokyo</h3>
      <p style="font-weight: normal;">Non-perishables, Dairy, Fruits</p>
      <a href="http://maps.google.co.uk/maps?q=35.6762,139.6503" class="gpsBtn">GPS</a>
      `
      )  
  )
  .addTo(map);
}
