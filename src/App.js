import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";

import CreateDeck from "./Layout/CreateDeck";
import Decks from "./Layout/Decks";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
// import DecDelete from "./Layout/DeleteDeck";
import NotFound from "./Layout/NotFound";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  const { path } = useRouteMatch();

  console.log(path);

  return (
    <div className="app-routes">
      <Switch>
        <Route exact path="/">
          <Layout />
        </Route>
        <Route exact path={"/decks/new"}>
          <CreateDeck />
        </Route>
        <Route path="/decks/:deckId">
          <Decks />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
