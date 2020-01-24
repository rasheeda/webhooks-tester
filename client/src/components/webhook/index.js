import React, { useState, useEffect } from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import { getWebhooksData } from "../../services/webhookz";
import { Link } from "react-router-dom";
import WebhookData from "../WebhookData";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";
import JavascriptTimeAgo from "javascript-time-ago";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

function Webhook() {
    let { webhook } = useParams();

    const [hooksData, setHooksData] = useState({});
    const [selectedWebhookData, setSelectedWebhookData] = useState({});

    useEffect(() => {
        JavascriptTimeAgo.locale(en);

        getWebhooksData(webhook)
            .json(response => {
                setHooksData(response);

                const selectedWebhookData = response.find(
                    data => data.id === response[0].id
                );
                setSelectedWebhookData(selectedWebhookData);
            })
            .catch(error => {
                console.log("error getting all data ", error);
            });
    }, []);

    const select = id => {
        const selectedWebhookData = hooksData.find(data => data.id === id);
        setSelectedWebhookData(selectedWebhookData);
    };

    const isEmpty = obj => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    };

    return (
        <div>
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
                <div className="request-syntax">
                    <SyntaxHighlighter language="javascript" style={dracula}>
                        curl -X POST -d 'Catch All Requests!'
                        https://webhookstester.dev/a/{webhook}
                    </SyntaxHighlighter>
                </div>
                {isEmpty(selectedWebhookData) ? (
                    `No request data selected. Select one on the right or make a request to (https://webhookstester.io/a/${webhook})`
                ) : (
                    <WebhookData details={selectedWebhookData} />
                )}
            </article>
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

export default Webhook;
