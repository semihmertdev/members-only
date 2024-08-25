const Message = require('../models/message');

exports.createMessage = async (req, res) => {
  const { title, text } = req.body;

  try {
    await Message.create({ title, text, userId: req.user.id });
    req.flash('success', 'Mesaj başarıyla oluşturuldu.');
    res.redirect('/');
  } catch (error) {
    req.flash('error', 'Mesaj oluşturulamadı.');
    res.redirect('/new-message');
  }
};

exports.getAllMessages = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'Giriş yapmadan mesajları göremezsiniz.');
    return res.redirect('/login');
  }

  const messages = await Message.findAll({ include: 'User' });
  res.render('index', { messages });
};

exports.deleteMessage = async (req, res) => {
  if (!req.user.is_admin) {
    req.flash('error', 'Bu işlemi yapmaya yetkiniz yok.');
    return res.redirect('/');
  }

  try {
    await Message.destroy({ where: { id: req.params.id } });
    req.flash('success', 'Mesaj silindi.');
    res.redirect('/');
  } catch (error) {
    req.flash('error', 'Mesaj silinemedi.');
    res.redirect('/');
  }
};
