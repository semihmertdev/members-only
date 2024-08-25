const express = require('express');
const router = express.Router();
const passport = require('passport');
const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');
const adminRoutes = require('./admin');

// Tüm kullanıcıların erişebileceği yollar
router.get('/login', (req, res) => res.render('login'));
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', authController.signup);

router.get('/join', (req, res) => res.render('join'));
router.post('/join', authController.joinClub);

router.get('/logout', (req, res) => {
  req.logout(); // Geri çağırma fonksiyonu olmadan
  res.redirect('/');
});

router.use('/admin', adminRoutes);

// Giriş yapılmadan erişim sağlanmaması gereken yollar
router.get('/', messageController.getAllMessages);

router.get('/new-message', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('new_message');
  } else {
    req.flash('error', 'Lütfen önce giriş yapın.');
    res.redirect('/login');
  }
});

router.post('/new-message', messageController.createMessage);
router.post('/delete-message/:id', messageController.deleteMessage);

module.exports = router;
