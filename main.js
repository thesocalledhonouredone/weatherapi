async function getData(city) {
    try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=a6874fa7a2714d3486941521250509&q=${city}&aqi=no`
        );

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error;
        }
    } catch (err) {
        console.log(err);
    }
}

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", async () => {
    let cityName = document.getElementById("cityName").value;
    let display = document.getElementById("display");
    display.innerHTML = "";

    if (cityName === '') {
        display.append(document.createElement("li").innerText = "No City Entered...");
    } else {
        const data = await getData(cityName);
        
        // location element
        const locElement = document.createElement("p");
        locElement.innerText = data.location.country + ", " + data.location.name;
        // icon element
        const iconElement = document.createElement("img");
        iconElement.src = data.current.condition.icon;
        // temp element
        const tempElement = document.createElement("p");
        tempElement.innerText = "Temperature: " + data.current.temp_c + " C";
        
        display.append(locElement, iconElement, tempElement);
    }
});

// http://api.weatherapi.com/v1/current.json?key=a6874fa7a2714d3486941521250509 &q=London&aqi=yes