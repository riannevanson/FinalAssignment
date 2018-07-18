import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import SignupPage from "./components/signup/SignupPage";
import EventsList from "./components/events/EventsList";
import EventDetails from "./components/events/EventDetails";
import LogoutPage from "./components/logout/LogoutPage";
import "./App.css";
import TopBar from "./components/layout/TopBar";
import TicketsList from "./components/tickets/TicketsList";
import TicketDetails from "./components/tickets/TicketDetails";
import CommentsList from "./components/tickets/CommentsList";

// <Route exact path="/signup" component={SignupPage} />
// <Route exact path="/games" component={GamesList} />
// <Route exact path="/games/:id" component={GameDetails} />

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <TopBar />
          </nav>
          <main style={{ marginTop: 75 }}>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/events" component={EventsList} />
            <Route exact path="/events/:id" component={EventDetails} />
            <Route exact path="/events/:id/tickets" component={TicketsList} />
            <Route
              exact
              path="/events/:id/tickets/:ticketId"
              component={TicketDetails}
            />
            <Route exact path="/" render={() => <Redirect to="/events" />} />
            <Route
              exact
              path="/tickets/:ticketId/comments"
              component={CommentsList}
            />
          </main>
        </div>
      </Router>
    );
  }
}
export default App;
