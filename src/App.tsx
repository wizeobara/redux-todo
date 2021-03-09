import React from "react";
import Header from "./components/header/Header";
import Main from "./page/Main";
import Sub from "./page/Sub"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <Header />
          <Switch>
            <Route exact path = "/" component={Main}/>
            <Route exact path = "/sub" component={Sub}/>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
