
const axios = require('axios');

const PROJECT_ID = process.env.STRINGEE_PROJECT_ID;
const PROJECT_SECRET = process.env.STRINGEE_PROJECT_SECRET;
const ACCESS_TOKEN = process.env.STRINGEE_ACCESS_TOKEN;

const AUTH_HEADER = { 'X-STRINGEE-AUTH': ACCESS_TOKEN };
const BASE_URL = 'https://api.stringee.com/v1/room2';

const getToken = async ({ userId, roomId, rest }) => {
  const response = await axios.get(
    'https://v2.stringee.com/web-sdk-conference-samples/php/token_helper.php',
    {
      params: {
        keySid: PROJECT_ID,
        keySecret: PROJECT_SECRET,
        userId,
        roomId,
        rest
      }
    }
  );
  return response.data;
};

const getAccessToken = () => ACCESS_TOKEN;

const getUserToken = async userId => (await getToken({ userId })).access_token;

const getRoomToken = async roomId => (await getToken({ roomId })).tokens.room_token;

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

const removeRoom = async roomId => axios.put(`${BASE_URL}/delete`, { roomId }, { headers: AUTH_HEADER }).data;

const removeAllRooms = async () => {
  const rooms = await listRoom();
  const response = await Promise.all(rooms.map(room => removeRoom(room.roomId)));
  return response;
};

module.exports = {
  createRoom,
  listRoom,
  removeRoom,
  removeAllRooms,
  getAccessToken,
  getUserToken,
  getRoomToken
};
