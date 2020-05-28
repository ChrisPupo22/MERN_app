import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/users";
import NewPlace from "./places/pages/newPlace";
import MainNavigation from "./shared/components/Nav/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import AuthUser from "./user/pages/Auth";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route exact path="/" component={Users} />
          <Route path="/:userId/places" component={UserPlaces}/>
          <Route path="/places/new" component={NewPlace} />
          <Route path="/places/:placeId" component={UpdatePlace} />
          <Route path="/auth" component={AuthUser} />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
