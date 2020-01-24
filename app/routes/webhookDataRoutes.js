module.exports = app => {
    var webhookData = require("../controller/webhookDataController");

    app.get(`/a/webhook/data`, async (req, res) => {
        return res.status(200).send({ 1: "data here!" });
    });

    app.route("/api/webhooks/:webhook/data").get(webhookData.getDataByWebhook);

    app.route("/a/:webhook").all(webhookData.create);
};
