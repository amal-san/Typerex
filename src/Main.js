import React from "react";
import {
  Route,
  HashRouter,
  Switch
} from "react-router-dom";
import Header from './Components/Header';
import {Start} from './Pages/Start';
import {Home} from './Pages/Home';
import { ProtectedRoute } from './Components/ProtectedRoute';
import auth from './Components/auth';




 
function Main() {




  return (
      <HashRouter>
      <Switch>
        <>
          <Header/>
            <section>
              <Route exact path="/" component={Home}/>
              <ProtectedRoute exact path="/start" component={Start}/>
            </section>
        </>
      </Switch>
      </HashRouter>

  )
}

 
export default Main;