import React, { useState, useEffect } from 'react';
import './App.css';
import Weather from './components/weather';
import Form from './components/form';

const getDateToday = n => {
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + n);
  const dateToday = `${newDate.getFullYear()}-${newDate.getMonth() +
    1}-${newDate.getDate()}`;
  return dateToday;
};

const App = () => {
  const [city, setCity] = useState(null);
  const [temp, setTemp] = useState(null);
  const [country, setCountry] = useState(null);
  const [tempToDay, setTempToDay] = useState(null);
  const [tempToDay2, setTempToDay2] = useState(null);
  const [tempToDay3, setTempToDay3] = useState(null);
  const [tempToDay4, setTempToDay4] = useState(null);
  const [tempToDay5, setTempToDay5] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = '2a261c6c2eb90926fedf327539ede8bd';

  const gettingWeather = async text => {
    if (text && text.split(' ').join('') !== '') {
      const api_url = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${text}&appid=${API_KEY}&lang=ru`
      );

      if(!api_url.ok) {
        return (
          setError('Некоректное название города')
        )
      } else {
        setError(null)
      }

      const data = await api_url.json();
      console.log(data);

      const getDate = dt => {
        const date = new Date(dt * 1000);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month}-${day}`;
      };

      const getCelsius = temp => Math.floor(temp - 273, 15);

      const tempDay = n =>
        data.list.map((item, id) => {
          if (getDateToday(n) === getDate(item.dt)) {
            const time = item.dt_txt.slice(10, 16);

            return (
              <ul
                key={id}
                style={{
                  listStyleType: 'none',
                  padding: '0',
                  width: '150px',
                  height: '150px',
                  display: 'inline-block',
                  backgroundColor: ''
                }}
              >
                <h6>{item.weather[0].description}</h6>
                <li>{time}</li>
                <li>{getCelsius(item.main.temp)} °C</li>
                <h6>Ветер {item.wind.speed.toFixed(1)} м/с</h6>
              </ul>
            );
          }
          return null;
        });

      return (
        setCity(data.city.name),
        setCountry(data.city.country),
        setTemp(getCelsius(data.list[0].main.temp)),
        setTempToDay(tempDay(0)),
        setTempToDay2(tempDay(1)),
        setTempToDay3(tempDay(2)),
        setTempToDay4(tempDay(3)),
        setTempToDay5(tempDay(4))
      );
    }
  };

  useEffect(() => {
    gettingWeather('kiev');
  }, []);

  useEffect(() => {
    gettingWeather();
  }, [city]);

  return (
    <div className='x'>
      <Form gettingWeather={gettingWeather} />
      <Weather
        city={city}
        country={country}
        temp={temp}
        getDateToday={getDateToday}
        tempToDay={tempToDay}
        tempToDay2={tempToDay2}
        tempToDay3={tempToDay3}
        tempToDay4={tempToDay4}
        tempToDay5={tempToDay5}
        error={error}
      />
    </div>
  );
};

export default App;
