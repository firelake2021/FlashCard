import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import { Link } from "react-router-dom";
import CardForm from "./CardForm";

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
    loadData();
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
        <CardForm
          front={card.front}
          back={card.back}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          handleOnClickDone={handleOnClickDone}
          buttonNameSubmit={"Submit"}
          buttonNameCancel={"Cancel"}
        ></CardForm>
      </div>
    </div>
  );
}
export default CardUpdate;
