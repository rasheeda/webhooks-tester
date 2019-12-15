import React from "react";
import logo from "../../assets/images/logo.svg";
import "./styles.css";
import { create } from "../../services/webhookz";
import { Redirect } from "react-router-dom";

function Home() {
    const createWebhook = () => {
        create()
            .json(response => {
                console.log("webhook created", response);
                if (response.id.name) {
                    console.log(
                        "webhook created successfully",
                        `/${response.id.name}`
                    );

                    window.location.replace(`/${response.id.name}`);
                }
            })
            .catch(() => {
                console.log("error making request");
            });
    };

    return (
        <div className="home">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <p>Easily create a test webhook URL to catch all requests</p>
            <button className="c_button" onClick={createWebhook}>
                Create Webhook
            </button>
        </div>
    );
}

export default Home;
