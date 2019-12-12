import React, { useState, useEffect } from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import { getWebhooksData } from "../../services/webhookz";

function Webhook() {
    let { webhook } = useParams();

    const [hooksData, setHooksData] = useState({});

    useEffect(() => {
        getWebhooksData(webhook)
            .json(response => {
                console.log("res: ", response);
                setHooksData(response);
            })
            .catch(() => {
                console.log("error getting all data");
            });
    }, []);

    return (
        <div>
            {hooksData.length > 0 &&
                hooksData.map(data => (
                    <a href="#">
                        <p>
                            {data.webhook} ({data.created_at})
                        </p>
                    </a>
                ))}
        </div>
    );
}

export default Webhook;
