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
  computed: {
    roomUrl: function () {
      const port = location.port;
      const portString = port ? `:${port}` : '';
      return `http://${location.hostname}${portString}/video-call?roomId=${this.roomId}`;
    }
  },
  mounted() {
    api.setRestToken();

    const urlParams = new URLSearchParams(location.search);
    const roomId = urlParams.get('roomId');

    if (roomId) {
      this.roomId = roomId;
      this.joinRoom();
    }
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
    publishVideo: async function (shareScreen = false) {
      const localTrack = await StringeeVideo.createLocalVideoTrack(this.client, {
        audio: true,
        video: true,
        screen: shareScreen,
        videoDimensions: { width: 640, height: 360 }
      });

      const videoElement = localTrack.attach();
      videoElement.classList.add('col-12');
      videoContainer.appendChild(videoElement);

      const roomData = await StringeeVideo.joinRoom(this.client, this.roomToken);
      const room = roomData.room;
      console.log({ roomData, room });

      this.room = room;
      room.clearAllOnMethos();
      room.on('addtrack', async (event) => {
        const trackInfo = event.info.track;

        if (trackInfo.serverId === localTrack.serverId) {
          return;
        }
        this.subcribeTrack(trackInfo);
      });
      room.on('removetrack', (event) => {
        if (!event.track) {
          return;
        }

        const elements = event.track.detach();
        elements.forEach(element => element.remove());
      });

      roomData.listTracksInfo.forEach(trackInfo => this.subcribeTrack(trackInfo));

      room.publish(localTrack);
    },
    joinRoom: async function (showPrompt = false) {
      if (showPrompt) {
        const roomId = prompt('Dán Room ID vào đây');
        if (!roomId) {
          return;
        }
        this.roomId = roomId;
      }

      const roomToken = await api.getRoomToken(this.roomId);

      this.roomToken = roomToken;

      await this.login();
      await this.publishVideo();
    },
    subcribeTrack: async function (trackInfo) {
      const track = await this.room.subscribe(trackInfo.serverId);
      track.on('ready', () => {
        const ele = track.attach();
        this.addVideo(ele);
        videoContainer.appendChild(ele);
      });
    },
    addVideo: function (videoElement) {
      videoElement.setAttribute('controls', true);
      videoElement.setAttribute('playsinline', true);
      videoContainer.appendChild(videoElement);
    }
  }
});
