const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize, User } = require('./models');
const bcrypt = require('bcrypt');

const app = express(); // 'app' değişkenini burada tanımlıyoruz

app.use(express.static('public')); // 'app' değişkenini kullanarak statik dosyaları sunuyoruz

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({ db: sequelize }),
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return done(null, false, { message: 'Yanlış kullanıcı adı.' });
      }
      
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return done(null, false, { message: 'Yanlış şifre.' });
      }
      
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');

app.use(authRoutes);
app.use(indexRoutes);

sequelize.sync({ alter: true })
  .then(() => console.log('Database & tables created!'))
  .catch(err => console.error('Error syncing database:', err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
