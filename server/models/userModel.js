const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    address: {
      type: String,
      required: false,
    },
    pic: {
      type: String,
      required: true,
      default: "https://bitcoin.org/img/icons/opengraph.png?1662473327",
    },
    monitoredToken: [
      {
        ticker: {
          type: String,
          required: true,
        },
        blockchain: {
          type: String,
          required: true,
        },
        to_receive: {
          type: Number,
          required: true,
          default: 0,
        },
        receivedAmount: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
