import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Button } from "reactstrap";
import { auth, signInWithGoogle } from "./firebase";
import Header from "./Header";
import ReceiptView from "./ReceiptView";
import ReceiptFormView from "./ReceiptFormView";

class App extends Component {
  state = {
    user: undefined
  };

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <Router>
        <Header />
        <Container fluid>
          {this.state.user ? (
            <>
              <Route exact path="/" component={ReceiptView} />
              <Route
                path="/receipt-form/:receiptId?"
                component={ReceiptFormView}
              />
            </>
          ) : (
            <Button color="primary" onClick={signInWithGoogle}>
              Kirjaudu sisään
            </Button>
          )}
        </Container>
      </Router>
    );
  }
}

export default App;
