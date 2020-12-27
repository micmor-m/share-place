import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getCoordsFromAddress, getAddressFromCoords } from "./Utility/Location";

class PlaceFinder {
  constructor() {
    const locateUserBtn = document.querySelector("#locate-btn");
    const addressForm = document.querySelector("form");
    const shareBtn = document.getElementById("share-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    this.sharebtn.addEventListener("click", this.sharePlaceHandler);
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }

  sharePlaceHandler() {
    const shareLinkInputElement = document.getElementById("share-link");
    //if the browser the user is using does not support clipboard
    //as fallback select the text so that the user just need to copy it
    if (!navigator.clipboard) {
      shareLinkInputElement.select();
      return;
    }
    //in broeser support clipboard copy the text into it
    navigator.clipboard
      .writeText(shareLinkInputElement.value)
      .then(() => {
        alert("Copied to clipboard");
      })
      //if any error log the error and atleast select the text
      .catch((err) => {
        console.log(err);
        shareLinkInputElement.select();
      });
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    this.shareBtn.disable = false;
    const shareLinkInputElement = document.getElementById("share-link");
    shareLinkInputElement.value = `${
      location.origin
    }/share-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${
      coordinates.lng
    }`;
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
      async (successResult) => {
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        const address = await getAddressFromCoords(coordinates);
        modal.hide();
        console.log(coordinates);
        this.selectPlace(coordinates, address);
      },
      (error) => {
        modal.hide();
        alert("Could not locate you. Please enter an address manually");
      }
    );
  }

  async findAddressHandler(event) {
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
    //because the address could contain an error
    //I need to wrap the function that use it in a try-catch
    try {
      //getCoordsFromAddress return a promise
      //to handle it I wrap all method in async
      const coordinates = await getCoordsFromAddress(address);
      this.selelctPlace(coordinates, address);
    } catch (err) {
      alert(err.message);
    }
    modal.hide();
  }
}

const app = new PlaceFinder();
