if (process.env.NODE_ENV === "production") {
  //change it later to prod
  module.exports = require("./dev");
} else {
  module.exports = require("./dev");
}
