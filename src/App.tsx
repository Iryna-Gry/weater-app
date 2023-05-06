import React, { useState } from 'react';
import axios from 'axios';
import { WiDaySunny, WiRain, WiSnow, WiThunderstorm, WiCloudy } from 'react-icons/wi';
import './App.scss';
import { Logo } from './components/Logo/Logo';

type WeatherData = {
  name: string;
  weather: {
    main: string;
    description: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
};

const weatherIcons: { [key: string]: any } = {
  Thunderstorm: WiThunderstorm,
  Drizzle: WiRain,
  Rain: WiRain,
  Snow: WiSnow,
  Clear: WiDaySunny,
  Clouds: WiCloudy,
};

const App = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState('');

  const getWeather = async (cityName: string) => {
    try {
      const configValue: string = (process.env.REACT_APP_API_KEY as string);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${configValue}&units=metric`
      );
      setWeather(response.data);
      setCity('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getWeather(city);
  };

  const WeatherIcon = weather ? weatherIcons[weather.weather[0].main] : null;

  return (
    <div className="App">
      <aside className='aside'>
        
          <Logo />
      
          
      </aside>
        <div className='main-view'>
          <div className='container'>
      <form className='search-box' onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit">Get Weather</button>
          </form>
      {weather && (
        <div className='weather-box'>
          <h2 className='weather-city'>{weather.name}</h2>
          <p className='weather-desc'>{weather.weather[0].description}</p>
          {WeatherIcon && <WeatherIcon size={72} className='weather-icon'/>}
          <p className='weather-temp'>Temperature: {weather.main.temp}°C</p>
          <p>Feels like: {weather.main.feels_like}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind speed: {weather.wind.speed} m/s</p>
          </div>
         
      )}

          </div>
       </div>
    </div>
  );
}

export default App;
