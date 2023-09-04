const express = require('express');

const {
  admin,
  cards,
} = require('../controllers');

const { isAuth } = require('../middlewares');

const router = express.Router();

router.get('/api/health', (req, res) => res.status(200).json({ status: 'healthy' }));

router.post('/admins/authenticate', admin.login);
router.get('/admins', isAuth, admin.list);
router.post('/admins', isAuth, admin.create);
router.get('/admins/:id', isAuth, admin.get);
router.put('/admins/:id', isAuth, admin.update);
router.delete('/admins/:id', isAuth, admin.del);
router.post('/admins/logout', admin.logout);

router.get('/cards', isAuth, cards.list);
router.get('/cards/:id', isAuth, cards.get);
router.put('/cards/:id', isAuth, cards.update);
router.delete('/cards/:id', isAuth, cards.del);
router.post('/cards/', isAuth, cards.create);

module.exports = router;
