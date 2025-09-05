async function getData(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=a6874fa7a2714d3486941521250509&q=${city}&aqi=no`
    );

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", async () => {
  let cityName = document.getElementById("cityName").value.trim();
  let display = document.getElementById("display");
  display.innerHTML = "";

  if (cityName === "") {
    const li = document.createElement("li");
    li.innerText = "No City Entered...";
    display.append(li);
    return;
  }

  const data = await getData(cityName);

  if (!data) {
    const errorMsg = document.createElement("p");
    errorMsg.innerText = "Could not fetch weather data. Try again later.";
    display.append(errorMsg);
    return;
  }

  // location element
  const locElement = document.createElement("p");
  locElement.innerText = `${data.location.country}, ${data.location.name}`;

  // icon element
  const iconElement = document.createElement("img");
  iconElement.src = `https:${data.current.condition.icon}`; // add https for safety

  // temp element
  const tempElement = document.createElement("p");
  tempElement.innerText = `Temperature: ${data.current.temp_c} °C`;

  display.append(locElement, iconElement, tempElement);
});
