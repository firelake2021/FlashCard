import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api";
import { handleOnClickStudy, handleOnClickDeleteDeck } from "../utils/common";

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    setDecks([]);
    async function loadData() {
      const response = await listDecks();
      setDecks(response);
    }
    loadData();
  }, []);

  console.log(decks);

  const handleOnClickCreateDeck = () => {
    console.log("create deck on click");
    window.location = `/decks/new`;
  };

  // View desk
  ////decks/:deckId
  const handleOnClickView = (id) => {
    window.location = `/decks/${id}`;
  };

  if (decks)
    return (
      <>
        <Header />
        <div className="container">
          {/* TODO: Implement the screen starting here */}
          <button onClick={handleOnClickCreateDeck}>Create Deck</button>
          <div>
            {decks.map((deck) => (
              <div key={deck.id}>
                <header>
                  {" "}
                  <h2>{deck.name}</h2>
                  <p className="rate-button">{deck.cards.length} cards</p>
                </header>
                <p>{deck.description}</p>
                <button onClick={() => handleOnClickView(deck.id)}>View</button>
                <button onClick={() => handleOnClickStudy(deck.id)}>
                  Study
                </button>
                <button onClick={() => handleOnClickDeleteDeck(deck.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  return <NotFound />;
}

export default Layout;
