import React, { useEffect, useRef, useState } from 'react';
import search from '../Icons/search.png';
import cloud from '../Icons/cloud.png';
import wind from '../Icons/wind.png';
import drizzle from '../Icons/drizzle.png';
import rain from '../Icons/rain.png';
import clear from '../Icons/clear.png';
import humidity from '../Icons/humidity.png';
import snow from '../Icons/snow.png';

import './Weather.css';

export const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    '01d': clear,
    '01n': clear,
    '02d': cloud,
    '02n': cloud,
    '03d': cloud,
    '03n': cloud,
    '04d': drizzle,
    '04n': drizzle,
    '09d': rain,
    '09n': rain,
    '10d': rain,
    '10n': rain,
    '13d': snow,
    '13n': snow,
  };

  const searcher = async (city) => {
    if (city === '') {
      alert('Please enter the city name.');
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error('Error in fetching weather data.');
    }
  };

  useEffect(() => {
    searcher('Chennai');
  }, []);

  return (
    <div className="weather">
      <div className="search_bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={search}
          alt="error..."
          onClick={() => searcher(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="error..." className="weather_icon" />
          <p className="temperature">{weatherData.temperature} °C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather_data">
            <div className="col">
              <img src={humidity} alt="error.." />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="error.." />
              <div>
                <p>{weatherData.windSpeed}</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
