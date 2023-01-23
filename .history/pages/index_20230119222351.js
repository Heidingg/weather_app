import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import React from 'react';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [location, setLocation] = useState('');
  const [data, setData] = useState({});
  const [weather, setWeather] = useState();
  const [main, setMain] = useState();
  const [wind, setWind] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [icon, setIcon] = useState('');
  var lang = "en";
  var units = "metric";
  var apiKey = "8a3b66428312171f7c96dafa7cbc5a31";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`;


  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          console.clear();
          setData(response.data)
          console.log(response.data)
          setWeather(response.data.weather)
          setWind(response.data.wind)
          setIcon(response.data.icon)
          setErrorMessage("")
        }).catch(err => {
          console.log(err); 
          setErrorMessage("Please enter another location")
          setData({})
          setWeather()
          setMain()
          setWind()
          setIcon()
        })
      setLocation('')
    }
  }


  return (
    <>
      <Head>
        <title>Loweather</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="cloudy.png" alt=""/>
      </Head>

      <main className={styles.main}>
        <div className={styles.location}></div>
          <div className={styles.locationIcon}>
          <div className={styles.locationName}>
            {data.name}
          </div>
        </div>

        <div className={styles.errorMess}>{errorMessage}</div>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder="Type Your Location"
          onKeyDown={searchLocation}
          type="text"
        >
        </input>

        <div className={styles.weatherData}>
          <div className={styles.weatherCondition}>
            {
              weather && weather.map((w, index) => {
                return (
                  <div key={index}>
                    <div className={styles.iconId}>{w.icon}</div>
                    <img className={styles.iconStyle} src={`http://openweathermap.org/img/wn/${w.icon}@2x.png`}></img>
                    <div className={styles.weatherMain}>{w.main}</div>
                  </div>
                )
              })
            }
          </div>

          {
            weather && weather.map((w, index) => {
              return (
                <div key={index}>
                  <div className={styles.weatherDesc}>Description: {w.description}</div>
                </div>
              )
            })
          }

          {
            main && weather.map(() => {
              return (
                <div>
                  <div className={styles.weatherTemp}>Temperature: {main.temp}&#176;C</div>
                  <div className={styles.weatherFeel}>Feels like: {main.feels_like}&#176;C</div>
                </div>
              )
            })
          }

          {
            wind && weather.map(() => {
              return (
                <div>
                  <div className={styles.weatherWind}>Wind gust: {wind.gust} m/s</div>
                </div>
              )
            })
          }

        </div>
      </main>
    </>
)
}