import { Map } from "./UI/Map";

class LoadedPlace {
  constructor(coordinates, address) {
    new Map(coordinates);
    const headerTitleEl = document.querySelector("header h1");
    headerTitleEl.textContent = address;
  }
}

//to convert the current URL into an object with key/value pair to be easy to extract the information needed
const url = new URL(location.href);
const queryParams = url.serchParams;
const coords = {
  lat: +queryParams.get("lat"),
  lng: +queryParams.get("lng"),
};
const address = queryParams.get("address");
new LoadedPlace(coords, address);
