import mongoose from "mongoose";

var Schema = mongoose.Schema;

var checkOut = new Schema({
  clientId: { type: String },

  consultantId: { type: String },

  name: { type: String },

  cardNumber: { type: String },

  month: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  cvc: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  avenue: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  chargeId: {
    type: String,
  },
});

mongoose.models = {};

var CheckOut = mongoose.model("CheckOut", checkOut);

export default CheckOut;
