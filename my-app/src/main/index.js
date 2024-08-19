import { useState, useEffect } from 'react';
import { API_KEY } from '../core/constant';
import { getRandomElementArr } from '../core/helpers';
import './index.css';
const WeatherData =  () => {
    const [weatherTemp, setWeatherTemp] = useState(0);
    const [currentCity, setCurrentCity] = useState("");
    const [answer, setAnswer] = useState(null);
    const [value, setValue] = useState(0);
    const [isVisibility, setIsVisibility] = useState(false);
    const cityArray = ["Yerevan", "London", "Sydney", "Moscow", "Madrid", "Cuba", "Italy"];    

    const gameAgain = () => {
      const randomCity = getRandomElementArr(cityArray);
      setCurrentCity(randomCity);
      setValue("");
      setIsVisibility(false);
    }
    useEffect((() => {
      gameAgain();
    }), [])
  
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
    
    const handleInput = (e) => {
     setValue(e.target.value);
    }
    const handleCheck = () => {
      if(Math.abs(weatherTemp - value) <= 4){
        setAnswer(true)
      }
      else{
        setAnswer(false)
      }
     setIsVisibility(true)
    }
 
   
    return (
      <div className='main'>
       <h2> {currentCity} </h2>
      <input  value={value} onChange={handleInput} type='text'/>
      <div>
      <h3 className='weatherTemp' style={{display: isVisibility ? "block" :  "none"}}>{weatherTemp}</h3>     
      <button onClick={handleCheck}>Check</button>
      { isVisibility && (answer ? "right answer" : "wrong answer")} 
      <button onClick={gameAgain}>Next</button>
      </div>
      </div>
    )
  }
  
  export default WeatherData;