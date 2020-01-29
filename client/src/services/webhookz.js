import wretch from "wretch";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/webhooks`;

export const create = () => wretch(API_URL).post();

export const getWebhooksData = webhook =>
    wretch(`${API_URL}/${webhook}/data`).get();
