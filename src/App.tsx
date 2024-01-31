import React, { useState } from "react";
import "./App.css";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
  }[];
}

const API_KEY = "6e84e57a336fa60ab09c4e1008c62e38";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const App: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="App">
      <h1>React Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeatherData}>Get Weather</button>

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main?.temp} °C</p>
          <p>Humidity: {weatherData.main?.humidity}%</p>
          {weatherData.weather && weatherData.weather.length > 0 && (
            <p>Weather: {weatherData.weather[0]?.main}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
