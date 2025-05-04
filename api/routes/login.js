const bcrypt = require('bcryptjs');
const express = require('express');
const pool = require('../db');

const TEST_ADMIN_LOGIN = process.env.TEST_ADMIN_LOGIN;
const TEST_ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD;
const TEST_ADMIN_ROLE_ID = process.env.TEST_ADMIN_ROLE_ID;

const router = express.Router();

router.get('/me', (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: 'Не авторизован' });
  res.json(req.session.user);
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

router.post('/login', async (req, res) => {
  const { login, password } = req.body;

  try {
    let user;

    if (login === TEST_ADMIN_LOGIN) {
      if (password !== TEST_ADMIN_PASSWORD) {
        return res.status(400).json({ error: 'Неверный пароль' });
      }
      user = {
        UserID: 0,
        role_ID: Number(TEST_ADMIN_ROLE_ID),
      };
    } else {
      const { rows } = await pool.query(
        'SELECT * FROM users WHERE login = $1 AND deleted_at IS NULL',
        [login]
      );
      user = rows[0];

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: 'Неверный логин или пароль' });
      }
    }

    req.session.user = {
      UserID: user.UserID,
      role_ID: user.role_ID,
    };

    res.json({ success: true });
  } catch (err) {
    console.error('Ошибка логина:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});


module.exports = router;
