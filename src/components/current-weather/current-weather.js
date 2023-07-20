import React from "react";
import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label"><b>Details</b></span>
          </div>
          {[
            { label: "Feels Like", value: data.main.feels_like },
            { label: "Wind", value: data.wind.speed },
            { label: "Humidity", value: data.main.humidity },
            { label: "Pressure", value: data.main.pressure },
          ].map(({ label, value }) => (
            <div key={label} className="parameter-row">
              <span className="parameter-label">{label}</span>
              <span className="parameter-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
