const model = require('../models/stringee');

const index = (req, res) => {
  const roomId = req.query.roomId;
  console.log(roomId);
  res.render('video-call');
};

const list = async (req, res) => {
  const rooms = await model.listRoom();
  res.send(rooms);
};

module.exports = {
  index,
  list
};
