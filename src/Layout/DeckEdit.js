import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import { Link } from "react-router-dom";

function EditDeck() {
  const [deck, setDecks] = useState({});
  const deckId = useParams().deckId;

  // http://localhost:3000/decks/1/edit

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
  console.log("decID", deckId);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log("handle on submit");
    console.log(deck.name, deck.description);
    const response = await updateDeck({
      id: `${deckId}`,
      name: `${deck.name}`,
      description: `${deck.description}`,
    });
    console.log("saved data", response);
  };

  const handleOnChange = ({ target }) => {
    setDecks({ ...deck, [target.name]: [target.value] });
  };

  const handleOnCancel = (event) => {
    event.preventDefault();
    window.location = "/";
  };

  if (deck.cards)
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
            <li>Edit</li>
          </ul>
        </nav>
        <div className="sorter">
          <form
            name="DeckEdit"
            className="input-form"
            onSubmit={handleOnSubmit}
          >
            <h2>Edit Deck</h2>
            <fieldset className="post">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  name="name"
                  type="text"
                  value={deck.name}
                  required
                  onChange={handleOnChange}
                ></input>
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  type="text"
                  rows={10}
                  required
                  value={deck.description}
                  onChange={handleOnChange}
                ></textarea>
              </div>
              <button type="Submit">Submit</button>
              <button onClick={handleOnCancel}>Cancel</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  return "loading";
}
export default EditDeck;
