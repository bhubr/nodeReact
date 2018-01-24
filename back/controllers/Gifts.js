const GiftModel = require('../models/Gift');
const NotifyService = require('../services/Notify');

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
      if(! req.body || ! req.body.id) {
        return res.status(400).json({
          error: "Body not found or required 'id' property not found in body"
        });
      }
      // Here I simply send back the number of deleted rows
      GiftModel.delete(req.body.id)
        .then(result => res.json({
          deletedRows: result.affectedRows
        }));
    },

    notify: (req, res, next) => {
        // Send a mail to Santa
        GiftModel.readAll()
          .then(gifts => gifts.map(g => '<li>' + g.name + '</li>'))
          .then(giftItems => '<ul>' + giftItems.join('') + '</ul>')
          .then(giftsHtml => NotifyService.sendEmail(
            'My Christmas Wishlist',
            giftsHtml
          ))
          .then(() => {
            res.json({
              success: true
            });
          });
    }
}

module.exports = Gifts;
