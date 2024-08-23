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
        {gameResult}
        </div>        
        </div>
    )
}
export default ModalWindow;