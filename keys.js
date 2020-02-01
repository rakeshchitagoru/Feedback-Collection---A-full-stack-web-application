// figure out prod/dev

if(process.env.NODE_ENV === 'production'){
 // production environment, return the prod set of keys
 module.exports = require("./prod");
} else {
  // dev environment, return  the dev set of keys
  module.exports = require("./dev");
}