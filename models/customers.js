const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: Number,
        min: 10,
        required: true
    },
    isGold: { type: Boolean, default: false }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().required(),
        phone: Joi.number().min(10).max(10).required(),
        isGold: Joi.boolean()
    }

    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.Validate = validateCustomer;