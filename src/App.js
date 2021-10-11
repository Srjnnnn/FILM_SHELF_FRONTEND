import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MainAppComponent } from "./containers/MainAppComponent";
import UserDetails from "./containers/UserDetailsPage";

function App() {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={MainAppComponent}/>
        <Route path='/User' exact component={UserDetails}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
