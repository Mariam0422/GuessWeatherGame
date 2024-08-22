import { useState, useEffect } from 'react';
import { API_KEY, cityArray } from '../core/constant';
import { getRandomElementArr } from '../core/helpers';
import ResultComponent from '../resultComponent';
import './index.css';

const WeatherData =  () => {
    const [weatherTemp, setWeatherTemp] = useState(Infinity);
    const [currentCity, setCurrentCity] = useState("");
    const [answer, setAnswer] = useState(null);
    const [value, setValue] = useState();
    const [currentArray, setCurrentArray ] = useState([]);
    const [results, setResults] = useState([]);

    const gameAgain = () => {
      
        let availableCities = cityArray.filter(city => !currentArray.includes(city));   
         
        const randomCity = getRandomElementArr(availableCities);
        setCurrentCity(randomCity);  
     
    };
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
      if(currentCity === "") { return}
      let correct = (Math.abs(weatherTemp - value) <= 4);
      setAnswer(correct);
      
      const result = {
          city: currentCity,
          answer: correct,
          temp: weatherTemp
      };
      setResults([...results, result]);
  
      setCurrentArray(prevArray => {
          const newArray = [...prevArray, currentCity];          
 
          if (newArray.length >= 5) {
              console.log("game finish");
              setCurrentCity("");      
              return newArray; 
          } else {             
              let availableCities = cityArray.filter(city => !newArray.includes(city));
              const randomCity = getRandomElementArr(availableCities);
              setCurrentCity(randomCity);
              return newArray;
          }
      });  
      setValue("");
  };
     
    


    return (
       <div>
      <div className='main'>
       <h2> {currentCity} </h2>
       <input className='input'  value={value} onChange={handleInput} type='text'/>     
  
      <button className='button' onClick={handleCheck}>Check</button>           
      </div>     
      <ResultComponent results ={results}/>
      </div>  
      
     
    )
  }
  
  export default WeatherData;