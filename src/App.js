import React, { useState } from 'react';
import "./App.css";

function App() {
  const keys = {
    API_KEY: '38fdcf84b125803f20c6a40aec0e900a',
    BASE_URL: 'https://api.openweathermap.org/data/2.5/'
}
  const date = () => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  }

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const search = (e) => {
    if (e.key === 'Enter') {
      console.log(`${keys.BASE_URL}weather?q=${query}&units=metric&appid=${keys.API_KEY}`);
      fetch(`${keys.BASE_URL}weather?q=${query}&units=metric&appid=${keys.API_KEY}`).then((res) => res.json()).then((result) => {
        setQuery('');
        setWeather(result);
      })
      console.log(weather);
    }
  }

  return (
    <div className={
      typeof weather.main != 'undefined' ? weather.main.temp > 18 ? 'App hot' : 'App cold' : 'App'
    }>
      <main>
        <div className='search-container'>
          <input type='text' placeholder='Search...' className='search-bar' onChange={(e) => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
        {typeof weather.main != 'undefined' ? (
        <div>
          <div className='location-container'>
            <div className='location'>
              {weather.name}, {weather.sys.country}
            </div>
            <div className='date'>
              {date}
            </div>
          </div>
          <div className='weather-container'>
            <div className='temperature'>
              {Math.round(weather.main.temp)}°C
            </div>
            <div className='weather'>
              {weather.weather[0].main}
            </div>
          </div>
        </div>
        ) : (
          ''
        )}
      </main>
    </div>
  );
}

export default App;
