const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const socketIO = require("socket.io");
const webhookDataModel = require("./app/model/webhookDataModel");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

//IMPORT ROUTES
require("./app/routes/webhookRoutes")(app);
require("./app/routes/webhookDataRoutes")(app);

app.use(express.static("./client/build"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// socket.io setup
const io = socketIO(server);

io.on("connection", socket => {
    console.log("socket connection is on");

    //Here we listen on a new namespace called "incoming data"
    // socket.on("getWebhooksData", data => {
    //     console.log("connection made to getWebhooksDataEventTrigger, ", data);
    //     // given the data, find and return the webhooks data for the webhook uRL provided
    //     //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
    //     //io.sockets.emit("getWebhooksData", data);
    // });

    //A special namespace "disconnect" for when a client disconnects
    socket.on("disconnect", () => console.log("Client disconnected"));
});

// define a namespace
const namesp = io.of("/a/webhooks/data");

let data = {};
let namespSocket = {};

namesp.on("connection", function(socket) {
    console.log("someone connected: ");

    socket.on("getWebhooksData", webhook => {
        webhookDataModel.getDataByWebhook(webhook, function(err, webhookData) {
            if (err) console.log("error getting webhook data");
            data = webhookData;
        });
    });

    namespSocket = socket;

    socket.emit("getWebhooksData", data);
});

server.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});

module.exports.getIONamespaceSocket = () => {
    if (!namesp) {
        throw new Error(
            "Must call module constructor function before you can get the IO instance"
        );
    }

    return namespSocket;
};
