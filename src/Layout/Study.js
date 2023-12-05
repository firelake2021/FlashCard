import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { readDeck } from "../utils/api";

import Flip from "./Flip";
import NotEnoughCards from "./NotEnoughCards";

function Study() {
  const [deck, setDecks] = useState({});
  const deckId = useParams().deckId;
  const [count, setCount] = useState(0);
  const [deckName, setDeckName] = useState("");
  const [cards, setCards] = useState([]);
  const [isFlipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!isFlipped);
  };

  const handleOnNext = () => {
    setCount(count + 1);
    setFlipped(false);
    if (count === cards.length - 1 && isFlipped) {
      const confirmBox = window.confirm(
        "Restart the cards?\n Click 'cancel' to return to the home page"
      );
      if (confirmBox === true) setCount(0);
      else window.location = "/";
    }
  };

  useEffect(() => {
    setDecks([]);
    const abortController = new AbortController();
    async function loadData() {
      try {
        const { name, cards } = await readDeck(deckId, AbortController.signal);
        setDeckName(name);
        setCards(cards);
      } catch (error) {}
    }
    loadData();
    return () => abortController.abort();
  }, [deckId]);

  if (cards.length > 2)
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
        <div className="sorter">
          <div>
            <h1>Study: {deckName}</h1>
          </div>
          <div className="post">
            <h3>
              Card {count + 1} of {cards.length}
            </h3>
            <p>{cards[count].front}</p>
            <Flip
              front={cards[count].front}
              back={cards[count].back}
              handleOnNext={handleOnNext}
              handleFlip={handleFlip}
              isFlipped={isFlipped}
              card={{
                id: cards[count].id,
                front: cards[count].front,
                back: cards[count].back,
              }}
            />
          </div>
        </div>
      </div>
    );
  else
    return (
      <NotEnoughCards
        deckName={deckName}
        deckId={deckId}
        numberOfCards={cards.length}
      />
    );
  //return "loading";
}
export default Study;
