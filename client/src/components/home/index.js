import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import "./styles.css";
import { create, getWebhooksData } from "../../services/webhookz";
import { Link } from "react-router-dom";
import WebhookData from "../WebhookData";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";
import JavascriptTimeAgo from "javascript-time-ago";

function Home() {
    const [hooksData, setHooksData] = useState({});
    const [selectedWebhookData, setSelectedWebhookData] = useState({});

    useEffect(() => {
        JavascriptTimeAgo.locale(en);

        getWebhooksData("2jwi53xzk41hft7v")
            .json(response => {
                setHooksData(response);
            })
            .catch(() => {
                console.log("error getting all data");
            });
    }, []);

    const createWebhook = () => {
        create()
            .json(response => {
                if (response.id.name) {
                }
            })
            .catch(() => {
                console.log("error making request");
            });
    };

    const select = id => {
        const selectedWebhookData = hooksData.find(data => data.id === id);
        console.log("parse", selectedWebhookData);
        setSelectedWebhookData(selectedWebhookData);
    };

    return (
        <div className="webhooks wrapper">
            <div className="webhooks-nav">
                <ul>
                    {hooksData.length > 0 &&
                        hooksData.map(data => (
                            <WebhookItemListView
                                key={data.id}
                                select={select}
                                webhook={data}
                            />
                        ))}
                </ul>
            </div>
            <article className="webhooks_content">
                <WebhookData details={selectedWebhookData} />
            </article>
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            {/* <p>Easily create a webhook URL to catch all kinds of requests</p>
            <button className="brk-btn" onClick={createWebhook}>
                Create Webhook
            </button> */}
        </div>
    );
}

const WebhookItemListView = ({ webhook, select }) => (
    <li
        key={webhook.id}
        style={{ cursor: "pointer" }}
        onClick={() => select(webhook.id)}
    >
        <span
            className={`webhook-item-method webhook-item-method-${JSON.parse(
                webhook.data
            ).method.toLowerCase()}`}
        >
            {JSON.parse(webhook.data).method}
        </span>
        <br />
        <span className="webhook-item-date">
            <ReactTimeAgo date={webhook.created_at} />
        </span>
        <br></br>
        <span className="webhook-item-http-version">
            HTTP Version: {JSON.parse(webhook.data).httpVersion}
        </span>
    </li>
);

export default Home;
