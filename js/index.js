async function search(city) {
  let api = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=b55270c3972c413999c114419241012&q=${city}&days=3`
  );
  if (api.ok) {
    let data = await api.json();
    displayToday(data.location, data.current);
    displayTomorrow(data.forecast.forecastday);
    displayNext(data.forecast.forecastday);
  }
}

document
  .querySelector("#floatingInput")
  .addEventListener("input", function (e) {
    search(e.target.value);
    document.getElementById("label").classList.add("d-none");

    if (e.data == null) {
      document.getElementById("label").classList.remove("d-none");
    }
  });

document
  .querySelector("#button-addon2")
  .addEventListener("click", function (e) {
    search(document.querySelector("#floatingInput").value);
  });

var daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthsOfTheYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function displayToday(location, current) {
  if (current != null && current != undefined) {
    var date = new Date(current.last_updated);
    let cartona = `<div
                class="header d-flex justify-content-between py-2 px-2 rounded-top-4 rounded-end-0"
              >
                <div class="day">${daysOfTheWeek[date.getDay()]}</div>
                <div class="date">${
                  date.getDate() + " " + monthsOfTheYear[date.getMonth()]
                }</div>
              </div>
              <div class="content ps-3">
                <div class="location py-4">${location.name}</div>
                <div class="degree">
                  <div class="number h1 ">${current.temp_c} <sup>o</sup> C</div>
                  <div class="icon mt-5">
                    <img src="https:${
                      current.condition.icon
                    }" alt="" class="w-25" />
                  </div>
                </div>
                <div class="status pb-3">${current.condition.text}</div>
                <div class="item pt-3">
                  <span class="me-3"
                    ><img src="imgs/icon-umberella.png" alt="" />${
                      current.humidity
                    }%</span
                  >
                  <span class="me-3"
                    ><img src="imgs/icon-wind.png" alt="" />${
                      current.wind_kph
                    }km/h</span
                  >
                  <span class="me-3"
                    ><img src="imgs/icon-compass.png" alt="" /> East</span
                  >
                </div>
              </div>`;
    document.querySelector("#first").innerHTML = cartona;
  }
}

function displayTomorrow(forecast) {
  let cartona = "";
  for (let i = 1; i < forecast.length; i++) {
    if (i != forecast.length - 1) {
      cartona += `<div class="header py-2 px-2">
                <div class="day">${
                  daysOfTheWeek[new Date(forecast[i].date).getDay()]
                }</div>
              </div>
              <div class="content pb-5">
                <div class="icon pt-5 pb-4">
                  <img src="https:${forecast[i].day.condition.icon}" alt="" />
                </div>
                <div class="degree fw-bolder">${
                  forecast[i].day.maxtemp_c
                } <sup>o</sup> C</div>
                <small>${forecast[i].day.mintemp_c}<sup>o</sup></small>
                <div class="status pt-4 pb-5">${
                  forecast[i].day.condition.text
                }</div>
              </div>`;
    }
  }
  document.querySelector("#sec").innerHTML = cartona;
}

function displayNext(forecast) {
  let cartona = "";
  for (let i = 2; i < forecast.length; i++) {
    cartona += `<div class="header py-2 px-2 rounded-end-4 rounded-bottom-0">
                  <div class="day">${
                    daysOfTheWeek[new Date(forecast[i].date).getDay()]
                  }</div>
                </div>
                <div class="content pb-5">
                  <div class="icon pt-5 pb-4">
                    <img src="https:${forecast[i].day.condition.icon}" alt="" />
                  </div>
                  <div class="degree fw-bolder">${
                    forecast[i].day.maxtemp_c
                  } <sup>o</sup> C</div>
                  <small>${forecast[i].day.mintemp_c}<sup>o</sup></small>
                  <div class="status pt-4 pb-5">${
                    forecast[i].day.condition.text
                  }</div>
                </div>`;
  }
  document.querySelector("#third").innerHTML = cartona;
}

search("cairo");
