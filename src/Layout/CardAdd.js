import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import { Link } from "react-router-dom";
import CardForm from "./CardForm";

//http://localhost:3000//decks/:deckId/cards/new
//http://localhost:3000/decks/2/cards/new
function CardAdd() {
  const [deck, setDecks] = useState([]);
  const deckId = useParams().deckId;
  const [card, setCard] = useState({});

  useEffect(() => {
    async function loadData() {
      try {
        const response = await readDeck(deckId);
        setDecks(response);
      } catch (error) {}
    }
    loadData();
  }, [deckId]);

  const handleOnChange = ({ target }) => {
    setCard({ ...card, [target.name]: `${target.value}` });
  };

  console.log("card", card);

  const handleOnClickDone = () => {
    window.location = `/decks/${deck.id}`;
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const response = await createCard(deckId, card);
    console.log("response", response);
    setCard({});
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
          <li>Add Card</li>
        </ul>
      </nav>
      <div>
        <h1>{deck.name}: Add Card</h1>
        <CardForm
          front={card.front}
          back={card.back}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          handleOnClickDone={handleOnClickDone}
          buttonNameSubmit={"Save"}
          buttonNameCancel={"Done"}
        ></CardForm>
      </div>
    </div>
  );
}
export default CardAdd;
