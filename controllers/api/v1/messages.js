const Message = require("../../../models/Message");

const getAll = (req, res) => {
  Message.find((err, docs) => {
    if (req.query.user) {
      Message.find({ user: req.query.user }, (error, doc) => {
        if (!error) {
          res.json({
            status: "succes",
            data: {
              messages: doc,
            },
          });
        } else {
          res.json({
            status: "error",
            message: "Get username Message.find() error: " + error,
          });
        }
      });
    } else {
      res.json(docs);
    }
  });
};

const getId = (req, res) => {
  Message.find({ _id: req.params.id }, (err, doc) => {
    if (!err) {
      res.json({
        status: "succes",
        data: {
          message: doc,
        },
      });
    } else {
      res.json({
        error: "Get id Message.find() error: " + err,
      });
    }
  });
};
const create = (req, res) => {
  let message = new Message();
  message.text = req.body.text;
  message.user = req.body.user;
  message.save((err, doc) => {
    if (!err) {
      res.json({
        status: "succes",
        data: {
          message: doc,
        },
      });
    }
  });
};
const update = (req, res) => {
  let message = Message.find({ _id: req.params.id }, (err, doc) => {
    if (err) {
      res.json({
        status: "error",
        message: "Put Message.find error: " + err,
      });
    }
  });
  let myquery = { _id: req.params.id };
  let newvalues = {
    $set: {
      text: req.body.text,
      user: req.body.user,
    },
  };
  message.updateOne(myquery, newvalues, (error, doc) => {
    Message.find({ _id: req.params.id }, (err, doc) => {
      if (!err) {
        res.json({
          status: "succes",
          data: {
            message: doc,
          },
        });
      } else {
        res.json({
          status: "error",
          message: "Put error: " + error,
        });
      }
    });
  });
};
const remove = (req, res) => {
  let message = Message.find({ _id: req.params.id }, (err, doc) => {
    if (err) {
      res.json({
        status: "error",
        message: "Delete Message.find() error: " + err,
      });
    }
  });
  let myquery = { _id: req.params.id };
  message.deleteOne(myquery, (err, doc) => {
    if (!err) {
      res.json({
        status: "succes",
        data: {
          message: "The message was removed",
        },
      });
    } else {
      res.json({
        status: "error",
        message: "Delete error: " + err,
      });
    }
  });
};

module.exports.getAll = getAll;
module.exports.getId = getId;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;
