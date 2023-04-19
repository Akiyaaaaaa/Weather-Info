const container = document.querySelector(".container");
const search = document.querySelector(".searchbox button");
const weatherBox = document.querySelector(".box-weather");
const weatherDeatails = document.querySelector(".details-of-weather");
const error = document.querySelector(".loc-not-found");

search.addEventListener("click", () => {
  const APIKey = "7121b5fcab22f0ef7d4651fa1065cb97";
  const city = document.querySelector(".searchbox input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDeatails.style.display = "none";
        error.style.display = "block";
        error.classList.add("fadeIn");
        return;
      }

      error.style.display = "none";
      error.classList.remove("fadeIn");

      const image = document.querySelector(".box-weather img");
      const temp = document.querySelector(".box-weather .temp");
      const desc = document.querySelector(".box-weather .desc");
      const humid = document.querySelector(".details-of-weather .humid span");
      const wind = document.querySelector(".details-of-weather .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "src/img/Clear.png";
          break;
        case "Rain":
          image.src = "src/img/Rain.png";
          break;
        case "Snow":
          image.src = "src/img/Snow.png";
          break;
        case "Overcast":
          image.src = "src/img/overcast.png";
          break;
        case "Clouds":
          image.src = "src/img/Cloud.png";
          break;
        case "Haze":
          image.src = "src/img/mist.png";
          break;
        case "Thunderstorm":
          image.src = "src/img/thunderstorm.png";
          break;
        default:
          image.src = "";
      }

      temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      desc.innerHTML = `${json.weather[0].description}`;
      humid.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDeatails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDeatails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
