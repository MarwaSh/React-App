import React, { useState } from "react";
import "./App.css";
//import { debounce } from "lodash";

//I commented this and the debounce implementation due to environment issues and time limitation

//const debouncedFetchWeatherData = debounce(fetchWeatherData, 500);

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
  const [isLoading, setIsLoading] = useState(false);
  //const [controller, setController] = useState<AbortController | null>(null);
  const [weatherCache, setWeatherCache] = useState<{
    [key: string]: WeatherData;
  }>({});

  const fetchWeatherData = async () => {
    // Cancel previous request if any
    /* if (controller) {
      controller.abort();
    }*/

    //const newController = new AbortController();
    //setController(newController);

    try {
      setIsLoading(true);
      // Check cache before making the API request
      if (weatherCache[city]) {
        setWeatherData(weatherCache[city]);
      } else {
        const response = await fetch(
          `${API_URL}?q=${city}&appid=${API_KEY}&units=metric` //,
          //{ signal: newController.signal }
        );
        const data: WeatherData = await response.json();
        setWeatherData(data);

        // Update cache with new data
        setWeatherCache((prevCache) => ({
          ...prevCache,
          [city]: data,
        }));
      }
    } catch (error) {
      //if (!controller.signal.aborted) {
      console.error("Error fetching weather data:", error);
      //}
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>React Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          //dFetchWeatherData();
        }}
      />
      <button onClick={fetchWeatherData} disabled={isLoading}>
        Get Weather
      </button>

      {isLoading && <p>Loading...</p>}

      {weatherData && weatherData.name && weatherData.main && (
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