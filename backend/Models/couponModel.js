const mongoose = require('mongoose');


const couponSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    discount: String,
    status: String
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;

