const videoContainer = document.querySelector('#videos');

const vm = new Vue({
  el: '#app',
  data: {
    userToken: '',
    roomToken: '',
    roomId: '',
    room: undefined,
    client: undefined
  },
  mounted() {
    api.setRestToken();
  },
  methods: {
    login: function () {
      return new Promise(async (resolve) => {
        const userId = (Math.random() * 10000).toFixed(0);
        const userToken = await api.getUserToken(userId);
        this.userToken = userToken;

        const client = new StringeeClient();
        client.on('authen', (result) => {
          console.log('on authen', result);
          resolve(result);
        });
        client.connect(userToken);

        this.client = client;
      });
    },
    publishVideo: async function () {
      const localTrack = await StringeeVideo.createLocalVideoTrack(this.client, {
        audio: true,
        video: true,
        videoDimensions: { width: 640, height: 360 }
      });

      const videoElement = localTrack.attach();
      videoContainer.appendChild(videoElement);

      const roomData = await StringeeVideo.joinRoom(this.client, this.roomToken);
      const room = roomData.room;
      console.log({ roomData, room });

      this.room = room;
      room.clearAllOnMethos();
      room.on('addtrack', async (even) => {
        const trackInfo = event.info.track;

        if (trackInfo.serverId === localTrack.serverId) {
          return;
        }

        const track = await room.subscribe(trackInfo.serverId);
        track.on('ready', () => {
          const ele = localTrack.attach();
          videoContainer.appendChild(ele);
        });
      });

      room.publish(localTrack);
    },
    createRoom: async function () {
      console.log('Create Room');
      const room = await api.createRoom();
      const roomToken = await api.getRoomToken(room.roomId);

      this.roomId = room.roomId;
      this.roomToken = roomToken;

      await this.login();
      await this.publishVideo();
    },
    joinRoom: async function () {
      const roomId = prompt('Enter room ID');
      if (!roomId) {
        return;
      }

      const roomToken = await api.getRoomToken(roomId);
      this.roomId = roomId;
      this.roomToken = roomToken;

      await this.login();
      await this.publishVideo();
    }
  }
});
