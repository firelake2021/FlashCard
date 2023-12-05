import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import { Link } from "react-router-dom";

function CardUpdate() {
  const [deck, setDecks] = useState({});
  const [card, setCard] = useState({});

  const deckId = useParams().deckId;
  const cardId = useParams().cardId;

  // http://localhost:3000/decks/:deckId/cards/:cardId/edit
  //http://localhost:3000/decks/2/cards/2/edit

  useEffect(() => {
    async function loadData() {
      try {
        const response = await readDeck(deckId);
        setDecks(response);
        const lookUpCard = await readCard(cardId);
        setCard(lookUpCard);
      } catch (error) {
        console.log(error);
      }
    }
    async function loadDeck() {
      try {
        const response = await readDeck(deckId);
        setDecks(response);
      } catch (error) {
        console.log(error);
      }
    }

    loadData();
    loadDeck();
  }, [deckId, cardId]);

  const handleOnChange = ({ target }) => {
    setCard({ ...card, [target.name]: [target.value] });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log("calling submit", card.id, card.front, card.back, card.deckId);

    const response = await updateCard({
      front: `${card.front}`,
      back: `${card.back}`,
      id: `${card.id}`,
      deckId: card.deckId,
    });
    console.log("saved data", response);
    setCard({});
  };

  const handleOnClickDone = () => {
    window.location = `/decks/${deck.id}`;
  };

  return (
    <div>
      <nav>
        <ul className="breadcrumb">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li>Edit Card {cardId}</li>
        </ul>
      </nav>
      <div>
        <h1> {deck.name}: Edit Card</h1>
        <form name="editCard" className="input-form" onSubmit={handleOnSubmit}>
          <div>
            <div>
              <label htmlFor="front">Front</label>
              <textarea
                name="front"
                rows={10}
                required
                value={card.front}
                onChange={handleOnChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="Back">Back</label>
              <textarea
                name="back"
                rows={10}
                required
                value={card.back}
                onChange={handleOnChange}
              ></textarea>
            </div>
          </div>
          <button onClick={handleOnClickDone}>Cancel</button>
          <button type="Submit">Save</button>
        </form>
      </div>
    </div>
  );
}
export default CardUpdate;
