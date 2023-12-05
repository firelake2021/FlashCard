import React, { useState } from "react";
import { createDeck } from "../utils/api";
import { Link } from "react-router-dom";

function CreateDeck() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleOnSubmit = async (event) => {
    console.log("handle on submit");
    event.preventDefault();
    const response = await createDeck({
      name: `${name}`,
      description: `${description}`,
    });
    console.log("saved data", response);
    setName("");
    setDescription("");
    window.location = `/decks/${response.id}`;
  };

  const handleNameOnChange = ({ target }) => {
    setName(target.value);
  };

  const handleDescriptionOnChange = ({ target }) => {
    setDescription(target.value);
  };

  const handleOnCancel = () => {
    window.location = "/";
  };

  return (
    <div>
      <nav>
        <ul className="breadcrumb">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Create Deck</li>
        </ul>
      </nav>
      <div className="sorter">
        <form
          name="DeckCreate"
          className="input-form"
          onSubmit={handleOnSubmit}
        >
          <h2>Create Deck</h2>
          <fieldset className="post">
            <div>
              <label htmlFor="name">Name</label>
              <input
                name="deckName"
                type="text"
                value={name}
                onChange={handleNameOnChange}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                name="deckDescription"
                type="text"
                rows={10}
                value={description}
                onChange={handleDescriptionOnChange}
              ></textarea>
            </div>
            <button type="button" onClick={handleOnCancel}>
              Cancel
            </button>
            <button type="Submit">Submit</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
export default CreateDeck;
