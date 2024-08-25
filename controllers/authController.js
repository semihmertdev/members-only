const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.signup = async (req, res) => {
  const { full_name, username, password, confirmPassword } = req.body;
  
  if (password !== confirmPassword) {
    req.flash('error', 'Şifreler uyuşmuyor.');
    return res.redirect('/signup');
  }

  try {
    const user = await User.create({ full_name, username, password });
    req.flash('success', 'Kayıt başarılı! Giriş yapabilirsiniz.');
    res.redirect('/login');
  } catch (error) {
    req.flash('error', 'Kayıt başarısız.');
    res.redirect('/signup');
  }
};

exports.login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
});

exports.joinClub = async (req, res) => {
  const secretCode = "SECRET_PASSCODE"; // Gizli kod burada tanımlanır
  if (req.body.passcode === secretCode) {
    req.user.membership_status = true;
    await req.user.save();
    req.flash('success', 'Kulübe katıldınız!');
    res.redirect('/');
  } else {
    req.flash('error', 'Yanlış şifre.');
    res.redirect('/join');
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.is_admin) {
    return next();
  }
  req.flash('error', 'Bu sayfaya erişim izniniz yok.');
  res.redirect('/');
};
