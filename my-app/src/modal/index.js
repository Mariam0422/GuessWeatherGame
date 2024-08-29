import "./index.css";
const ModalWindow = ({ gameResult, setIsModal, resetGame }) => {
  return (
    <div className="modalWidow">
      <div className="but">
        <button
          onClick={() => {
            setIsModal(false);
            resetGame();
          }}
        >
          X
        </button>
      </div>
      <div className="resultAnswer">
        {gameResult ? (
          <div>
            <h3>Congratulations</h3>
            <h3>You Won!!!</h3>
          </div>
        ) : (
          <div>
            <h2 style={{color: "red"}}>You Lost!</h2>
            <h2 style={{color: "red"}}>Try Again</h2>
          </div>
        )}
      </div>
    </div>
  );
};
export default ModalWindow;
