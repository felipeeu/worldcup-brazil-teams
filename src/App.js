import React, { Component } from "react";
//import './App.css';
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Routes from "./Routes.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setYear } from "./actions";
import PropTypes from "prop-types";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  withStyles,
  IconButton
} from "@material-ui/core";
import BackIcon from "./assets/icons/back_icon";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache
});

const styles = theme => ({
  input: {
    display: "none"
  },

  app: {
    flexGrow: 1
  },

  appTitle: {
    fontSize: "2.0em"
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  }
});
class App extends Component {
  render() {
    const { classes, yearState } = this.props;

    return (
      <ApolloProvider client={client}>
        <div className={classes.app}>
          <AppBar position="static">
            <Toolbar className={classes.toolbar}>
              <Typography className={classes.appTitle}>
                Brasil nas Copas
              </Typography>

              {yearState ? (
                <IconButton
                  onClick={() => this.props.setYear(null)}
                  component={Link}
                  to="/"
                  color="secondary"
                  variant="contained"
                >
                  <BackIcon />
                </IconButton>
              ) : null}
            </Toolbar>
          </AppBar>
          <Routes year={yearState} />
        </div>
      </ApolloProvider>
    );
  }
}

const mapStateToProps = store => ({
  yearState: store.playerState.yearState
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ setYear }, dispatch);

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
