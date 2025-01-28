import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleShowWeather = () => {
    if (city.trim() !== "") {
      fetchWeather();
    }
  };

  const getRandomTemperature = () => {
    const min = Math.floor(Math.random() * 15) + 5; // Minimum temperature between 5°C and 20°C
    const max = min + Math.floor(Math.random() * 10) + 5; // Maximum temperature 5°C to 15°C higher than min
    const current = Math.floor(Math.random() * (max - min + 1)) + min; // Current temperature between min and max
    return { min, max, current };
  };

  const fetchWeather = () => {
    const conditions = ["Sunny", "Cloudy", "Rainy", "Snowy", "Windy"];
    const randomCondition =
      conditions[Math.floor(Math.random() * conditions.length)];

    const { min, max, current } = getRandomTemperature();

    setWeatherData({
      city: city,
      condition: randomCondition,
      temperature: {
        high: `${max}°C`,
        low: `${min}°C`,
        current: `${current}°C`,
      },
    });
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
          className="input"
        />
        <button className="btn" onClick={handleShowWeather}>
          Show Weather
        </button>
      </div>
      {weatherData && (
        <div className="weather">
          <h2>Weather in {weatherData.city}</h2>
          <p>Condition: {weatherData.condition}</p>
          <p>Current Temperature: {weatherData.temperature.current}</p>
          <p>High: {weatherData.temperature.high}</p>
          <p>Low: {weatherData.temperature.low}</p>
        </div>
      )}
    </div>
  );
};

export default App;
