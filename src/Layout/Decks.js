import {
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import DeckView from "./DeckView";
import EditDeck from "./DeckEdit";
import Study from "./Study";
import CardAdd from "./CardAdd";
import CardUpdate from "./CardUpdate";
import React from "react";

function Decks() {
  const { path } = useRouteMatch();
  console.log(path);
  return (
    <section>
      <Switch>
        <Route path={"/decks/:deckId/edit"}>
          <EditDeck />
        </Route>
        <Route exact path={"/decks/:deckId/study"}>
          <Study />
        </Route>
        <Route exact path={"/decks/:deckId/cards/new"}>
          <CardAdd />
        </Route>
        <Route exact path={"/decks/:deckId/cards/:cardId/edit"}>
          <CardUpdate />
        </Route>
        <Route exact path={"/decks/:deckId"}>
          <DeckView />
        </Route>
      </Switch>
    </section>
  );
}
export default Decks;
