const mongoose = require("mongoose");
const {Schema} = mongoose;  //is same as const Schema = mongoose.Schema which is basically desctruturing.

const userSchema = new Schema ({
    googleId: String
});

mongoose.model("users", userSchema); // loading into model