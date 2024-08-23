import './index.css';
const ModalWindow = ({gameResult, setIsModal, resetGame}) => {
    return (
        <div className="modalWidow">  
        <div className='but'>     
        <button onClick={() => {
             setIsModal(false);
             resetGame();          
             }}>X</button>
        </div>
        <div className='resultAnswer'>
        {gameResult 
        ? <div>
         <h3>Congratulations</h3>   
         <h3>You Won!!!</h3>   
        </div> 
        : <div>
            <h3>You Lost!</h3>
            <h3>Try Again</h3>
         </div>
         }
        </div>        
        </div>
    )
}
export default ModalWindow;