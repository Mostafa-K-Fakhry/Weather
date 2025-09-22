
var AllWeather=``;
var City='assuit';
var searchWeather= document.getElementById("cityInput");
async function getWeather(){
    var result=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e7237a6199c546fc98b132825251609&q=${City}&days=3&aqi=yes&alerts=yes`);
    var finalResult=await result.json();
     var forecastday=finalResult.forecast.forecastday;
     var todayDate =new Date(forecastday[0].date);
     var day =todayDate.toLocaleDateString("en-us",{weekday:"long"});
     var month = todayDate.toLocaleDateString("en-US", { month: "long" });
     var dayN = todayDate.getDate();
     console.log(`${dayN} ${month}`);
     

    AllWeather = ``;
    AllWeather =`
    <div class="wToday col-lg-4  mb-4">
            <div class="date">
              <pre id="today" class="">${day}            ${dayN} ${month}</pre>
            </div>
            <div class="weather ">
              <p id="city" class="lead">${finalResult.location.name}</p>
              <div class="icon d-flex position-relative">
                <h2 id="temp_c" class="">${finalResult.current.temp_c} <sup>o</sup>c</h2>
                <div class="icon ps-4" id="weatherConditionIcon">
                  <img src="https:${finalResult.current.condition.icon}" alt="icon" />
                </div>
              </div>

              <small id="weatherCondition">${finalResult.current.condition.text}</small>
              <div class="detail-icons mt-5 pt-3">
                <span
                  ><i class="fa-solid fa-droplet"></i>
                  <sup id="humidity">${finalResult.current.humidity}%</sup></span
                >
                <span class="ms-3"
                  ><i class="fa-solid fa-wind"></i>
                  <sup id="wind">${finalResult.current.wind_kph}km/h</sup></span
                >
                <span class="ms-3"
                  ><i class="fa-regular fa-compass"></i>
                  <sup id="dir">${finalResult.current.wind_dir}</sup></span
                >
              </div>
            </div>
          </div>
    `;

    //Next Day
    
       var nextDate =new Date(forecastday[1].date);
       var nextDay =nextDate.toLocaleDateString("en-us",{weekday:"long"});
      
   
    for(var i=1;i<=2;i++){
        var nextDate =new Date(forecastday[i].date);
       var nextDay =nextDate.toLocaleDateString("en-us",{weekday:"long"});
        AllWeather+=`
        <div class="col-lg-4  mb-4 text-center">
            <div class="date">
              <p id="nextday" >${nextDay}</p>
            </div>
            <div class="weather ">
              <div class="icon">
                <img src="https:${forecastday[i].day.condition.icon}" id="weatherConditionIcon2" alt="icon" />
              </div>
              <h2 id="maxtemp_c2">${forecastday[i].day.maxtemp_c} <sup>o</sup>c</h2>
              <h2 id="mintemp_c2">${forecastday[i].day.mintemp_c} <sup>o</sup>c</h2>
              <small id="nextWeatherCondition">${forecastday[i].day.condition.text}</small>
            </div>
          </div>
        
        `;
        document.querySelector(".row").innerHTML=AllWeather;

    }
    searchWeather.addEventListener("input",function(){
    City=searchWeather.value ;
    getWeather();
    

}
    )
}
getWeather();

