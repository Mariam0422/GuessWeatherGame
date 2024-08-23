import { useState, useEffect } from 'react';
import { API_KEY, cityArray } from '../core/constant';
import { getRandomElementArr } from '../core/helpers';
import ResultComponent from '../resultComponent';
import './index.css';
import ModalWindow from '../modal';

const WeatherData =  () => {
    const [weatherTemp, setWeatherTemp] = useState(Infinity);
    const [currentCity, setCurrentCity] = useState("");
    const [answer, setAnswer] = useState(null);
    const [value, setValue] = useState();
    const [currentArray, setCurrentArray ] = useState([]);
    const [results, setResults] = useState([]);
    const [visibility, setVisibility] = useState(false);
    const [gameResult, setGameResult] = useState(false);
    const [isModal, setIsModal] = useState("");
    const [error, setError] = useState("");

    const resetGame = () => {
        setWeatherTemp(Infinity);
        setCurrentCity("");
        setAnswer(null);
        setValue("");
        setCurrentArray([]);
        setResults([]);
        setVisibility(false);
        setGameResult(false);
        setIsModal(false);
        setError("");
        gameAgain();
    }
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
     if(error) setError("");
    }
  
    const handleCheck = () => {      
      if(currentCity === "") { return}
      if(!value){
        setError("Please enter number");
        return
      }
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
              setCurrentCity("");   
              const correctAnswers = newArray.filter((_, index) => results[index]?.answer === true).length;
              if (correctAnswers >= 3) {
                setGameResult("You Won!!!");
            } else {
                setGameResult("You Lost!");
            }  
            setIsModal(true); 
              return newArray; 
          } else {             
              let availableCities = cityArray.filter(city => !newArray.includes(city));
              const randomCity = getRandomElementArr(availableCities);
              setCurrentCity(randomCity);
              return newArray;
          }
      });  
      setVisibility(true);
      setValue("");
  };   
     const handleKeyDown = (e) => {
     if(e.key === "Enter"){
        handleCheck();
     }
    }

    return (
        <div>        
       <div className={isModal ? "blur" : ""}>
      <div className="main">
       <h2> {currentCity} </h2>
       <input className='input'  value={value} onChange={handleInput} onKeyDown={handleKeyDown} type='text'/>     
       {error && <div style={{color: "red"}}>{error}</div>}     
      <button className='button' onClick={handleCheck}>Check</button>      
     
      </div>  
      {visibility ? <ResultComponent results ={results}/> : ""}         
     
      </div>  
      {isModal && (               
                    <ModalWindow gameResult={gameResult} setIsModal = {setIsModal} resetGame = {resetGame}/>                
            )}
      </div>
     
    )
  }
  
  export default WeatherData;