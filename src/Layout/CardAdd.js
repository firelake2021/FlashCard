import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardFrontBack from "./CardFrontBack";
import { Link } from "react-router-dom";

function CardAdd() {
  const [deck, setDecks] = useState({});
  const deckId = useParams().deckId;
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  // http://localhost:3000//decks/:deckId/cards/new
  //http://localhost:3000/decks/2/cards/new

  useEffect(() => {
    setDecks([]);
    async function loadData() {
      try {
        const response = await readDeck(deckId);

        setDecks(response);
      } catch (error) {}
    }
    loadData();
  }, [deckId]);

  const handleOnChangeFront = ({ target }) => {
    setFront(target.value);
  };
  const handleOnChangeBack = ({ target }) => {
    setBack(target.value);
  };

  const handleOnClickDone = () => {
    window.location = `/decks/${deck.id}`;
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const response = await createCard(deckId, {
      front: `${front}`,
      back: `${back}`,
    });
    console.log("response", response);
    setBack("");
    setFront("");
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
        <form name="Add Card" className="input-form" onSubmit={handleOnSubmit}>
          <CardFrontBack
            front={front}
            back={back}
            handleOnChangeFront={handleOnChangeFront}
            handleOnChangeBack={handleOnChangeBack}
          />
          <button onClick={handleOnClickDone}>Done</button>
          <button type="Submit">Save</button>
        </form>
      </div>
    </div>
  );
}
export default CardAdd;
