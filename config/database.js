const { Sequelize } = require('sequelize');

// Veritabanı URL'si
const DATABASE_URL = 'postgresql://members_only_2pbc_user:ih05L7hc6C8aPdBPVsdGAv8x3UpgKnNN@dpg-cr5hga08fa8c73af01r0-a.frankfurt-postgres.render.com/members_only_2pbc';

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Sertifika doğrulama gerekliyse true yapabilirsiniz
    },
  },
});

sequelize.sync({ force: false })
  .then(() => console.log('Veritabanı senkronize edildi'))
  .catch(err => console.error('Veritabanı senkronizasyon hatası:', err));

module.exports = sequelize;
  