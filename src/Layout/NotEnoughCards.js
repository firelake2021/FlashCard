import React from "react";
import { Link } from "react-router-dom";

function NotEnoughCards({ deckId, numberOfCards, deckName }) {
  // http://localhost:3000/decks/:deckId/cards/new
  const handleOnClickAddCards = () => {
    window.location = `/decks/${deckId}/cards/new`;
  };
  return (
    <div>
      <nav>
        <ul className="breadcrumb">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          <li>Study</li>
        </ul>
      </nav>
      <h3>Not enough cards.</h3>
      <p>
        You need at least 3 cards to study. There are {numberOfCards} cards in
        this deck.
      </p>
      <button onClick={handleOnClickAddCards}>Add Cards</button>
    </div>
  );
}
export default NotEnoughCards;
