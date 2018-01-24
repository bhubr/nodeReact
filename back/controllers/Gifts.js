
const GiftModel = require('../models/Gift');

const Gifts = {
    create: (req, res, next) => {
      if(! req.body || ! req.body.name || ! req.body.name.trim()) {
        return res.status(400).json({
          error: "Body not found or required 'name' property not found in body"
        });
      }
      GiftModel.create(req.body.name)
        .then(gift => res.json(gift))
        .catch(err => {
          console.error('Error while creating Gift model', err);
          res.status(500).json({
            error: err.message
          });
        });
    },
    read: (req, res, next) => {
      GiftModel.readAll()
        .then(gifts => res.json(gifts));

    },
    delete: (req, res, next) => {

    },
    notify: (req, res, next) => {
        // Send a mail to Santa
    }
}

module.exports = Gifts;
