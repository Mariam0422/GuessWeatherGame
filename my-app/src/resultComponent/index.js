import './index.css';

const ResultComponent = ({results}) => {    
 
return (
    <div className='result'>
    {results.map((item, index) => {
   
     return (
        <div className='row' key={index}>
        {item.city}
        {item.answer 
        ? <div style={{color: "green"}}>Right Answer</div> 
        : <div style={{color: "red"}}>Wrong Answer</div>}
        {item.temp}
        </div>
     )
    })}
    
    </div>
)
}
export default ResultComponent;