import wretch from "wretch";

const API_URL = "http://localhost:5000/api/webhooks";

export const create = () => wretch(API_URL).post();

export const getWebhooksData = webhook =>
    wretch(`${API_URL}/${webhook}/data`).get();
