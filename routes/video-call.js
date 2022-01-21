const router = require('express').Router();
const model = require('../models/stringee');

router.get('/', (req, res) => {
  const roomId = req.query.roomId;
  console.log(roomId);
  res.render('video-call');
});

router.get('/access-token', async (req, res) => {
  const token = model.getAccessToken();
  console.log('ac', token);
  res.send(token);
});

router.get('/list', async (req, res) => {
  const rooms = await model.listRoom();
  res.send(rooms);
});

router.get('/create', async (req, res) => {
  const room = await model.createRoom();
  res.send(room);
});

router.get('/remove-all', async (req, res) => {
  const response = await model.removeAllRooms();
  res.send(response);
});

module.exports = router;
