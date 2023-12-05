import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteCard, readDeck } from "../utils/api";
import { Link } from "react-router-dom";

import Card from "./Card";
import { handleOnClickStudy, handleOnClickDeleteDeck } from "../utils/common";

function DeckView() {
  const [deck, setDeck] = useState({});
  const deckId = useParams().deckId;

  // /decks/:deckId
  //http://localhost:3000/decks/3

  useEffect(() => {
    setDeck([]);
    const abortController = new AbortController();
    async function loadData() {
      try {
        const response = await readDeck(deckId, AbortController.signal);
        setDeck(response);
      } catch (error) {}
    }
    loadData();
    return () => abortController.abort();
  }, [deckId]);
  console.log("dec here", deck);
  console.log("dec id", deckId);

  const handleOnClickEditDeck = (id) => {
    window.location = `/decks/${id}/edit`;
  };

  // http://localhost:3000/decks/:deckId/cards/new
  const handleOnClickAddCards = (id) => {
    window.location = `/decks/${id}/cards/new`;
  };

  const handleOnClickDeleteCard = async (id) => {
    const confirmBox = window.confirm(
      "Delete this card?\n You will not be able recover it"
    );

    if (confirmBox === true) {
      const response = await deleteCard(id);
      console.log("saved data", response);
      setDeck([]);

      async function loadData() {
        try {
          const response = await readDeck(deckId, AbortController.signal);
          setDeck(response);
        } catch (error) {}
      }
      loadData();
    } else window.location = `/decks/${deckId}`;
  };

  if (deck.cards)
    return (
      <div>
        <nav>
          <ul className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>{deck.name}</li>
          </ul>
        </nav>
        <div className="sorter">
          <div>
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <button onClick={() => handleOnClickEditDeck(deck.id)}>Edit</button>
            <button onClick={() => handleOnClickStudy(deck.id)}>Study</button>
            <button onClick={() => handleOnClickAddCards(deck.id)}>
              Add Cards
            </button>
            <button
              type="button"
              onClick={() => handleOnClickDeleteDeck(deck.id)}
            >
              Delete
            </button>
          </div>

          <h2>Cards</h2>
          <ul>
            {deck.cards.map((card) => (
              <Card
                key={card.id}
                front={card.front}
                back={card.back}
                id={card.id}
                handleOnClickDeleteCard={() => handleOnClickDeleteCard(card.id)}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  return "loading";
}
export default DeckView;
