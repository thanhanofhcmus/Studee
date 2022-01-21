
const axios = require('axios');

const ACCESS_TOKEN = process.env.STRINGEE_ACCESS_TOKEN;
const AUTH_HEADER = { 'X-STRINGEE-AUTH': ACCESS_TOKEN };
const BASE_URL = 'https://api.stringee.com/v1/room2';

const createRoom = async () => {
  const roomName = Math.random().toFixed(4);
  const response = await axios.post(
    `${BASE_URL}/create`,
    { name: roomName, uniqueName: roomName },
    { headers: AUTH_HEADER }
  );
  return response.data;
};

const listRoom = async () => (await axios.get(`${BASE_URL}/list`, { headers: AUTH_HEADER })).data.list;

const removeRoom = async roomId => (await axios.put(`${BASE_URL}/delete`, { roomId }, { headers: AUTH_HEADER })).data;

const removeAllRooms = async () => {
  const rooms = await listRoom();
  return await Promise.all(rooms.map(room => removeRoom(room.roomId)));
};

module.exports = {
  createRoom,
  listRoom,
  removeRoom,
  removeAllRooms
};
