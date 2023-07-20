import React, { useState } from "react";
import "./App.css";
import Search from "./components/search/search";
import Forecast from "./components/forecast/forecast";
import CurrentWeather from "./components/current-weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    try {
      const [lat, lon] = searchData.value.split(" ");

      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(
          `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        ).then((response) => response.json()),
        fetch(
          `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        ).then((response) => response.json()),
      ]);

      setCurrentWeather({ city: searchData.label, ...currentResponse });
      setForecast({ city: searchData.label, ...forecastResponse });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="background-image">
      <div className="container">
        <div className="weather-app">
          <div className="header">Weather App</div>
          <Search onSearchChange={handleOnSearchChange} />
          {currentWeather && <CurrentWeather data={currentWeather} />}
          {forecast && <Forecast data={forecast} />}
          <footer>
            <p className="footer-text">Powered by OpenWeatherMap API</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
