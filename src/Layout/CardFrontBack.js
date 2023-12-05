import React from "react";
function CardFrontBack({
  front,
  back,
  handleOnChangeBack,
  handleOnChangeFront,
}) {
  return (
    <div>
      <div>
        <label htmlFor="front">Front</label>
        <textarea
          name="front"
          rows={10}
          required
          value={front}
          onChange={handleOnChangeFront}
        ></textarea>
      </div>
      <div>
        <label htmlFor="Back">Back</label>
        <textarea
          name="back"
          rows={10}
          required
          value={back}
          onChange={handleOnChangeBack}
        ></textarea>
      </div>
    </div>
  );
}
export default CardFrontBack;
