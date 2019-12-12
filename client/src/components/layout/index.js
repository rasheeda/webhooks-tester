import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../home";
import "./styles.css";
import Webhook from "../webhook";

function Layout() {
    return (
        <Router>
            <div className="App">
                <div className="container">
                    <div className="navbar">
                        <div className="navbar-content">
                            <a>WebhooksTester</a>
                            <a class="active" href="#">
                                Github
                            </a>
                            <a class="active" href="#">
                                Privacy Terms
                            </a>
                            <div class="topnav-right">
                                <a href="#" className="nav-new-webhook-button">
                                    New
                                </a>
                            </div>
                        </div>
                    </div>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/:webhook" exact component={Webhook} />
                    </Switch>
                    <div className="footer">
                        <a href="https://mandeeya.io">mandeeya.io</a>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default Layout;
