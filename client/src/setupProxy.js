const proxy = require("http-proxy-middleware");
const dotenv = require("dotenv");

dotenv.config();

module.exports = function(app) {
    app.use(proxy("/*", { target: `${process.env.BACKEND_URL}` }));
};
