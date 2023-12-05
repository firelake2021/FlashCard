import React from "react";
function CardForm({
  front,
  back,
  handleOnChange,
  handleOnSubmit,
  handleOnClickDone,
  buttonNameSubmit,
  buttonNameCancel,
}) {
  return (
    <form name="input-card" className="input-form" onSubmit={handleOnSubmit}>
      <div>
        <div>
          <label htmlFor="front">Front</label>
          <textarea
            name="front"
            rows={10}
            required
            type="text"
            value={front}
            onChange={handleOnChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="Back">Back</label>
          <textarea
            name="back"
            rows={10}
            required
            type="text"
            value={back}
            onChange={handleOnChange}
          ></textarea>
        </div>
      </div>
      <button type="button" onClick={handleOnClickDone}>
        {buttonNameCancel}
      </button>
      <button type="Submit">{buttonNameSubmit}</button>
    </form>
  );
}
export default CardForm;
