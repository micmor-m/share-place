export class Map {
  constructor(coords) {
    //this.coordinates = coords;
    this.render(coords);
  }

  render(coordinates) {
    if (!google) {
      alert("Could not load maps library - please try again");
      return;
    }

    //add map
    const map = new google.maps.Map(document.getElementById("map"), {
      center: coordinates,
      zoom: 16,
    });

    //add a PIN on the map
    new google.maps.Marker({ positopn: coordinates, map: map });
  }
}
