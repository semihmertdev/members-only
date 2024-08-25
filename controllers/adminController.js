// controllers/adminController.js
const User = require('../models/user');

exports.dashboard = (req, res) => {
  res.render('admin/dashboard');
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render('admin/users', { users });
  } catch (error) {
    req.flash('error', 'Kullanıcıları yüklerken bir hata oluştu.');
    res.redirect('/admin/dashboard');
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { is_admin, membership_status } = req.body;
  
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.is_admin = is_admin === 'on'; // Convert checkbox input to boolean
      user.membership_status = membership_status === 'on'; // Convert checkbox input to boolean
      await user.save();
      req.flash('success', 'Kullanıcı güncellendi.');
    } else {
      req.flash('error', 'Kullanıcı bulunamadı.');
    }
    res.redirect('/admin/users');
  } catch (error) {
    req.flash('error', 'Kullanıcı güncellenirken bir hata oluştu.');
    res.redirect('/admin/users');
  }
};

exports.deleteUser = async (req, res) => {
    if (!req.user || !req.user.is_admin) { // Kullanıcının giriş yapıp yapmadığını kontrol edin
      req.flash('error', 'Bu işlemi yapmaya yetkiniz yok.');
      return res.redirect('/admin/users');
    }
  
    try {
      await User.destroy({ where: { id: req.params.id } });
      req.flash('success', 'Kullanıcı silindi.');
    } catch (error) {
      req.flash('error', 'Kullanıcı silinemedi.');
    }
  
    res.redirect('/admin/users');
  };
  