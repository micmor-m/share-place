const GOOGLE_API_KEY = "YOUR_API_KEY";

//from a couple of coordinates returns the address
export async function getAddressFromCoords(coords) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`
  );
  //if code status not 200 there was an error
  if (!response.ok) {
    throw new Error("Failed to fetch address. Please try again!");
  }
  const data = await response.json();
  //if code status 200 but still some error message present
  if (data.error_message) {
    throw new Error(data.error_message);
  }
  //if NO error
  console.log(data);
  const address = data.result[0].formatted_address;
  return address;
}

//from an address returns its coordinates
export async function getCoordsFromAddress(address) {
  const urlAddress = encodeULI(address);
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress},+CA&key=${GOOGLE_API_KEY}`
  );
  //if code status not 200 there was an error
  if (!response.ok) {
    throw new Error("Failed to fetch coordinates. Please try again!");
  }
  const data = await response.json();
  //if code status 200 but still some error message present
  if (data.error_message) {
    throw new Error(data.error_message);
  }
  //if NO error
  console.log(data);
  const coordinates = data.result[0].geometry.location;
  return coordinates;
}
