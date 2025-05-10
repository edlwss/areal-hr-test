const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db');
const argon2 = require('argon2');

passport.use(
  new LocalStrategy(
    { usernameField: 'login', passwordField: 'password' },
    async (login, password, done) => {
      try {
        const { rows } = await pool.query(
          'SELECT * FROM users WHERE login = $1 AND deleted_at IS NULL',
          [login]
        );
        const user = rows[0];
        if (!user) return done(null, false, { message: 'Неверный логин или пароль' });

        const valid = await argon2.verify(user.password, password);
        if (!valid) return done(null, false, { message: 'Неверный логин или пароль' });

        return done(null, {
          UserID: user.UserID,
          role_ID: user.role_ID,
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Сериализация пользователя
passport.serializeUser((user, done) => {
  done(null, user.UserID);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query(
      'SELECT "UserID", "role_ID", login FROM users WHERE "UserID" = $1',
      [id]
    );
    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
