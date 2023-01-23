import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import axios from 'axios'

const inter = Inter({ subsets: ['latin']})

export default function Home() {
  const [location, setLocation] = useState('');
  const [data,setData] = useState({});
  const [weather, setWeather] = useState();
  const[errorMessage, setErrorMessage] = useState('');


  var apiKey = "8a3b66428312171f7c96dafa7cbc5a31";
  var lang ="en";
  var units="metric";
  const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang${lang}`
  console.log(url)

  const searchLocation =(event)=>{
    if(event.key ==="Enter"){
      axios.get(url)
      .then((response)=>{
        console.clear();
        setData(response.data)
        console.log(response.data);
        setWeather(response.data.weather);
        setErrorMessage("")
      }).catch(err => {
        console.log(err);
        setErrorMessage("Please enter another location");
        setData({});
        setWeather();
      })
      searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);
      setLocation('')
    }
}
  return (
      <>
      <Head>
        <title>Loweather</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/cloudy.png" />
      </Head>

      <main className={styles.main}>
        {data.name}
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        placeholder="Enter Location"
        onKeyDown={searchLocation}
        type="text"
        />

        {
          weather && weather.map((w,index)=>{
            return(
              <div key ={index}>
                <div>{w.description}</div>
                <div className="weather-main">{w.main}</div>
                <div className={styles.iconId}>{w.icon}</div>
              </div>
            )
          })

        }
      </main>
      </>
  )
}
