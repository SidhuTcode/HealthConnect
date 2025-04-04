  let map, service, infowindow, markers = [];

  function initMap() {
    const initialLocation = { lat: 43.452969, lng: -80.495697 }; 
    map = new google.maps.Map(document.getElementById("googleMap"), {
      center: initialLocation,
      zoom: 7,
    });

    infowindow = new google.maps.InfoWindow();

    
  const searchButton = document.getElementById("search-button");
  const searchBox = document.getElementById("search-box");

  // Event listener for search button click
  searchButton.addEventListener("click", () => {
    performSearch();
  });

  // Event listener for pressing Enter in the input box
  searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission or other default behaviors
      performSearch();
    }
  });
}

function performSearch() {
  const cityName = document.getElementById("search-box").value.trim();
  if (cityName) {
    searchHospitalsInCity(cityName);
  } else {
    alert("Please enter a city name.");
  }
}

  function searchHospitalsInCity(cityName) {
    const request = {
      query: `hospitals in ${cityName}`,
      fields: ["name", "geometry", "formatted_address"],
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        map.setCenter(results[0].geometry.location);
        map.setZoom(13);
        clearMarkers();
        clearHospitalList();
        results.forEach((place, index) => {
          const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name,
          });
          markers.push(marker);

          google.maps.event.addListener(marker, "click", () => {
            infowindow.setContent(
              `<strong>${place.name}</strong><br>${place.formatted_address}`
            );
            infowindow.open(map, marker);
          });

          // Add the place to the hospital list
          addToHospitalList(place, marker, index);
        });
      } else {
        alert("No hospitals found in the specified city.");
      }
    });
  }

  function clearMarkers() {
    markers.forEach((marker) => marker.setMap(null));
    markers = [];
  }

  function clearHospitalList() {
    document.getElementById("hospital-list-items").innerHTML = "";
  }

  function addToHospitalList(place, marker, index) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div>
        <strong>${index + 1}. ${place.name}</strong><br>
        ${place.formatted_address}
        <button style="margin-top: 5px;" onclick="highlightMarker(${index})">View on Map</button>
      </div>
    `;
    document.getElementById("hospital-list-items").appendChild(listItem);
  }

  function highlightMarker(index) {
    google.maps.event.trigger(markers[index], "click");
  }