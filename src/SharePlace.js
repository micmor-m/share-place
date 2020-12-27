import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";

class PlaceFinder {
  constructor() {
    const locateUserBtn = document.querySelector("#locate-btn");
    const addressForm = document.querySelector("form");

    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));

    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }

  selectPlace(coordinates) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert("Location feature not available in the current browser");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location please wait."
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      (successResult) => {
        modal.hide();
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        console.log(coordinates);
        this.selectPlace(coordinates);
      },
      (error) => {
        modal.hide();
        alert("Could not locate you. Please enter an address manually");
      }
    );
  }

  findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.queryselector("input").value;

    if (!address || address.trim().length === 0) {
      alert("Invalid address entered -please try again!");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location please wait."
    );
    modal.show();
  }
}

const app = new PlaceFinder();
