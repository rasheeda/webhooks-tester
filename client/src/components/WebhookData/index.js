import React from "react";
import ReactJson from "react-json-view";
import "./styles.css";

const WebhookData = ({ details }) => {
    return (
        <div>
            {details.id && (
                <div className="webhook-data-content">
                    <table>
                        <tbody>
                            <tr>
                                <td>{JSON.parse(details.data).method}</td>
                                <td>{JSON.parse(details.data).url}</td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td>{details.created_at}</td>
                            </tr>
                            <tr>
                                <td>Host</td>
                                <td>{JSON.parse(details.data).ip}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3 className="headers">Headers</h3>
                    <ReactJson
                        src={JSON.parse(details.data).headers}
                        theme="ashes"
                        iconStyle="circle"
                    />

                    <h3 className="query">Query</h3>
                    <ReactJson
                        src={JSON.parse(details.data).query}
                        theme="google"
                    />

                    <h3 className="request-body">Request Body</h3>
                    <ReactJson
                        src={JSON.parse(details.data).body}
                        theme="greenscreen"
                    />
                </div>
            )}
        </div>
    );
};

export default WebhookData;
