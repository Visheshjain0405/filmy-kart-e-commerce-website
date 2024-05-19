const express = require('express');
const router = express.Router();
const Coupon = require('../Models/couponModel');

router.post('/api/addcoupon', async (req, res) => {
    try {
        const newCoupon = new Coupon(req.body);
        await newCoupon.save();
        res.status(201).send('Coupon added successfully');
    } catch (error) {
        console.error('Error adding coupon:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Get Coupons Route
router.get('/api/coupons', async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    } catch (error) {
        console.error('Error fetching coupons:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/api/deletecoupon/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the coupon by ID and delete it
      const deletedCoupon = await Coupon.findByIdAndDelete(id);
  
      if (!deletedCoupon) {
        return res.status(404).json({ error: 'Coupon not found' });
      }
  
      res.status(200).json({ message: 'Coupon deleted successfully' });
    } catch (error) {
      console.error('Error deleting coupon:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


module.exports =router