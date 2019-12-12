module.exports = app => {
    var webhook = require("../controller/webhookController");

    app.get(`/api/webhooks/test`, async (req, res) => {
        return res.status(200).send({ 1: "something :)" });
    });

    app.route("/api/webhooks")
        .get(webhook.getAll)
        .post(webhook.create);
};
