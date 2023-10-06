document.addEventListener("DOMContentLoaded", function () {
    const countryListElement = document.getElementById("countryList");

    fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((country) => {
                
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "col-md-6", "col-sm-12");

                const cardHeader = document.createElement("div");
                cardHeader.classList.add("card", "card-header");
                
                const headerText = document.createElement("h2");
                headerText.textContent = country.name.common;

                const cardBody = document.createElement("div");
                cardBody.classList.add("card", "card-body");

                const capital = document.createElement("p");
                capital.textContent = `Capital: ${country.capital}`;

                const region = document.createElement("p");
                region.textContent = `Region: ${country.region}`;

                const latlng = document.createElement("p");
                latlng.textContent = `Latlng: ${country.latlng}`;

                const name = document.createElement("p");
                name.textContent = `Name: ${country.name.common}`;

                const flag = document.createElement("img");
                flag.src = country.flags.png; 
                flag.alt = `${country.name.common } Flag`;

                const countryCodes = document.createElement("p");
                countryCodes.textContent = `Country Codes: ${country.cca2}, ${country.cca3}`;

                const weatherButton = document.createElement("button");
                weatherButton.classList.add("btn", "btn-primary");
                weatherButton.textContent = "Click for Weather";

                weatherButton.addEventListener("click", () => {
                    
                    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=64f0b4d5a5028cc3d9a1315cde8009bb`)
                        .then((response) => response.json())
                        .then((weatherData) => {
                            alert(`Weather in ${country.capital}:\nTemperature: ${weatherData.main.temp}°C\nWeather: ${weatherData.weather[0].description}`);
                        })
                        .catch((error) => {
                            console.error("Error fetching weather data:", error);
                        });
                });

                cardHeader.appendChild(headerText);
                cardBody.appendChild(capital);
                cardBody.appendChild(region);
                cardBody.appendChild(latlng);
                cardBody.appendChild(name);
                cardBody.appendChild(flag);
                cardBody.appendChild(countryCodes);
                cardBody.appendChild(weatherButton);

                card.appendChild(cardHeader);
                card.appendChild(cardBody);
                
                countryListElement.appendChild(card);
            });
        })
        .catch((error) => {
            console.error("Error fetching country data:", error);
        });
});

