class PlaceFinder {
  constructor() {
    const locateUserBtn = document.querySelector("#locate-btn");
    const addressForm = document.querySelector("form");

    locateUserBtn.addEventListener("click", this.locateUserHandler);

    addressForm.addEventListener("submit", this.findAddressHandler);
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert("Location feature not available in the current browser");
    }
    navigator.geolocation.getCurrentPosition(
      (successResult) => {
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        console.log(coordinates);
      },
      (error) => {
        alert("Could not locate you. Please enter an address manually");
      }
    );
  }

  findAddressHandler() {}
}

const app = new PlaceFinder();
