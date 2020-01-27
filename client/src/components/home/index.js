import React from "react";
import "./styles.css";
import { create } from "../../services/webhookz";
import { Alert } from "antd";

function Home() {
    const createWebhook = () => {
        create()
            .json(response => {
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
            <p>
                Webhooks tester is a free online tool for helping developers
                test weebhooks and other types of HTTP requests.
            </p>
            <p>
                To get started, click the button below to generate a URL to test
                your webhook requests.{" "}
            </p>
            <button className="c_button" onClick={createWebhook}>
                Create Webhook URL
            </button>
        </div>
    );
}

export default Home;
