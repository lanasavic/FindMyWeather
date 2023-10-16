import React, { useState } from 'react';
import axios from 'axios';
import Moment from 'moment';
import down from './assets/down.ico';
import up from './assets/up.ico';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  //const url = `http://api.weatherapi.com/v1/current.json?key=77775791822d4875a4a172413221611&q=${location}&aqi=no`; //weatherapi
  const url = `http://api.weatherapi.com/v1/forecast.json?key=7415481cf9c84e0eaad190011233001&q=${location}&days=5&aqi=no&alerts=no`; //weatherapi -- time limited (13.02.2023.) | openweatherapi ?
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        //console.log(response.data) //CHECK
      })
      setLocation('')
    }
  }

  var day0 = data.forecast?.forecastday[0].date;
  var day1 = data.forecast?.forecastday[1].date;
  var day2 = data.forecast?.forecastday[2].date;
  var day3 = data.forecast?.forecastday[3].date;
  var day4 = data.forecast?.forecastday[4].date;

  if (Object.keys(data).length === 0) {
    return(
    <div className="app">
      <div className='search'>
          <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter location'
          type='text' />
        </div>
      <div className="container">
          <img className='jump' src={up} alt='Arrow up' />
          <h2>Find your weather!</h2>
      </div>
    </div>
    )
  }
  return (
    <div className="app">
      <div className='search'>
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter location'
        type='text' />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            {data.location ? <p>{data.location.name}</p> : null}
            <hr />
            {data.location ? <p>{data.location.region}, {data.location.country}</p> : null}
          </div>
          <div className='temperature'>
            {data.current ? <h1 className='bold'>{data.current.temp_c}°C</h1> : null}
          </div>
          <div className='description'>
            {data.current ? <p>{data.current.condition.text}</p> : null}
            <img src={data?.current?.condition?.icon} alt="Weather icon" />
          </div>
        </div>
        <div className='bottom'>
          <div className='feels'>
            {data.current ? <p className='bold'>{data.current.feelslike_c}°C</p> : null}
            <p>Feels like</p>
          </div>
          <hr className='vertical'/>
          <div className='humidity'>
            {data.current ? <p className='bold'>{data.current.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <hr className='vertical'/>
          <div className='winds'>
            {data.current ? <p className='bold'>{data.current.wind_kph}km/h</p> : null}
            <p>Wind speed</p>
          </div>
        </div>

        <table className='table'>
          <thead>
              <tr>
                  <th colSpan="4">5-day forecast</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>{Moment(day0).format('D.M.YYYY.')}</td>
                  <td className='temps'>{data.forecast?.forecastday[0].day.mintemp_c}°C <img className='icon' src={down} alt="Temp down" /></td>
                  <td className='temps'>{data.forecast?.forecastday[0].day.maxtemp_c}°C <img className='icon' src={up} alt="Temp up" /></td>
                  <td><img className='weathericon' src={data?.forecast?.forecastday[0].day?.condition?.icon} alt="Weather icon" /></td>
              </tr>
              <tr>
                  <td>{Moment(day1).format('D.M.YYYY.')}</td>
                  <td className='temps'>{data.forecast?.forecastday[1].day.mintemp_c}°C <img className='icon' src={down} alt="Temp down" /></td>
                  <td className='temps'>{data.forecast?.forecastday[1].day.maxtemp_c}°C <img className='icon' src={up} alt="Temp up" /></td>
                  <td><img className='weathericon' src={data?.forecast?.forecastday[1].day?.condition?.icon} alt="Weather icon" /></td>
              </tr>
              <tr>
                  <td>{Moment(day2).format('D.M.YYYY.')}</td>
                  <td className='temps'>{data.forecast?.forecastday[2].day.mintemp_c}°C <img className='icon' src={down} alt="Temp down" /></td>
                  <td className='temps'>{data.forecast?.forecastday[2].day.maxtemp_c}°C <img className='icon' src={up} alt="Temp up" /></td>
                  <td><img className='weathericon' src={data?.forecast?.forecastday[2].day?.condition?.icon} alt="Weather icon" /></td>
              </tr>
              <tr>
                  <td>{Moment(day3).format('D.M.YYYY.')}</td>
                  <td className='temps'>{data.forecast?.forecastday[3].day.mintemp_c}°C <img className='icon' src={down} alt="Temp down" /></td>
                  <td className='temps'>{data.forecast?.forecastday[3].day.maxtemp_c}°C <img className='icon' src={up} alt="Temp up" /></td>
                  <td><img className='weathericon' src={data?.forecast?.forecastday[3].day?.condition?.icon} alt="Weather icon" /></td>
              </tr>
              <tr>
                  <td>{Moment(day4).format('D.M.YYYY.')}</td>
                  <td className='temps'>{data.forecast?.forecastday[4].day.mintemp_c}°C <img className='icon' src={down} alt="Temp down" /></td>
                  <td className='temps'>{data.forecast?.forecastday[4].day.maxtemp_c}°C <img className='icon' src={up} alt="Temp up" /></td>
                  <td><img className='weathericon' src={data?.forecast?.forecastday[4].day?.condition?.icon} alt="Weather icon" /></td>
              </tr>
          </tbody>
      </table>
      </div>
    </div>
  );
}

export default App;
