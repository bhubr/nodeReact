const express = require('express');
const router = express.Router();
const Gifts = require('../controllers/Gifts');

router
  .route('/api')
  .get(Gifts.read)
  .post(Gifts.create)
  .delete(Gifts.delete);

router
  .route('/api/notify')
  .post(Gifts.notify);

module.exports = router;
