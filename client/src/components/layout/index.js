import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../home";
import "./styles.css";
import Webhook from "../webhook";

function Layout() {
    const [isModalVisible, setModalVisibility] = useState(false);

    const showModal = () => setModalVisibility(true);

    const handleModalDismiss = () => {
        console.log("handle close");
        setModalVisibility(false);
    };

    return (
        <Router>
            <div className="App">
                <div className="container">
                    <div className="navbar">
                        <div className="navbar-content">
                            <a href="/">{process.env.REACT_APP_SITE_NAME}</a>
                            <a className="active" href="#">
                                Github
                            </a>

                            <a className="active" href="#">
                                About
                            </a>

                            <a className="active" href="#">
                                Privacy Terms
                            </a>

                            {/* <div class="topnav-right">
                                <a href="#" className="nav-new-webhook-button">
                                    <FontAwesomeIcon icon={faPlusSquare} /> New
                                    Webhook
                                </a>
                            </div> */}
                        </div>
                    </div>
                    <div className="wrapper">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/:webhook" exact component={Webhook} />
                        </Switch>
                    </div>
                    <div className="footer">
                        <a href="https://mandeeya.io">mandeeya.io </a> |{" "}
                        {new Date().getFullYear()} |{" "}
                        <a className="active" href="#">
                            Privacy Terms
                        </a>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default Layout;
