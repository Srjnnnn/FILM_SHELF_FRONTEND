import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MainAppComponent } from "./components/MainAppComponent";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={MainAppComponent}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
