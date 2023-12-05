import React from "react";
function Flip({ handleOnNext, handleFlip, isFlipped, card }) {
  return (
    <div>
      {" "}
      {isFlipped ? (
        <div>
          {" "}
          <button onClick={handleFlip}>Flip</button>
          <button onClick={handleOnNext}>Next</button>
        </div>
      ) : (
        <div>
          <button onClick={handleFlip}>Flip</button>
        </div>
      )}
    </div>
  );
}
export default Flip;
