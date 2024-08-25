// routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

// Admin panel routes (accessible only by admin users)
router.get('/dashboard', authController.isAdmin, adminController.dashboard);
router.get('/users', authController.isAdmin, adminController.listUsers);
router.post('/update-user/:id', authController.isAdmin, adminController.updateUser);

module.exports = router;
