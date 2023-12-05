import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Card({ id, front, back, handleOnClickDeleteCard }) {
  // http://localhost:3000/decks/:deckId/cards/:cardId/edit
  const deckId = useParams().deckId;

  const handleOnClickEditCard = () => {
    window.location = `/decks/${deckId}/cards/${id}/edit`;
  };

  return (
    <li>
      <section className="park-display">
        <div className="stats">
          <div className="established-display stat">
            <p>{front}</p>
          </div>
          <div className="area-display stat">
            <p>{back}</p>
            <button onClick={handleOnClickEditCard}>Edit</button>
            <button onClick={handleOnClickDeleteCard}>Delete</button>
          </div>
        </div>
      </section>
    </li>
  );
}
export default Card;
