import React from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";

import "./styles.css";

import Dashboard from "../Dashboard";
import Brand from "../../components/Brand";
import { Container, Nav, Navbar } from "react-bootstrap";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <header>
        <Navbar bg="light" variant="light">
          <Container>
            <Link
              to="/"
              className={
                (location.pathname === "/" && "adminactive") || "adminLink"
              }
            >
              ShopBridge
            </Link>

            <Nav className="me-auto">
              <Link
                to="/admin"
                className={
                  (location.pathname === "/admin" && "adminactive") ||
                  "adminLink"
                }
              >
                Admin
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </header>

      <main>
        <Switch>
          <Route exact path="/">
            <Brand />
          </Route>
          <Route exact path="/admin">
            <Dashboard />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
