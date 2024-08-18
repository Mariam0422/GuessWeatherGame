import { useState, useEffect } from 'react';
import { API_KEY } from '../core/constant';
import { getRandomElementArr } from '../core/helpers';
const WeatherData =  () => {
    const [weatherTemp, setWeatherTemp] = useState(0);
    const [currentCity, setCurrentCity] = useState("");
    const cityArray = ["Yerevan", "London", "Sydney", "Moscow", "Madrid", "Cuba", "Italy"];

    useEffect(() => {
      const randomCity = getRandomElementArr(cityArray);
      setCurrentCity(randomCity);
    }, []); 
    
    useEffect(() => {
      if (currentCity === "") return; 
      
      const getWeatherData = async () => {
          try{
              const response = await fetch(
                  `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=metric`
              );
              const data = await response.json();
              console.log(data);
              const temp = data.main.temp.toFixed(0);
              setWeatherTemp(temp);
          } catch(error) {
              console.log(error);
          } 
      }
      getWeatherData();
    }, [currentCity]); 
   console.log(currentCity);
    return (
      <div>
        {weatherTemp}
      </div>
    )
  }
  
  export default WeatherData;