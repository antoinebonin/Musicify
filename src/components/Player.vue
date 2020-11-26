<template>
  <v-card
      align="center"
      :loading="!isLoaded"
      fill-height
      class="elevation-0">

    <template slot="progress">
      <v-progress-circular
          color="green accent-3"
          size="100"
          width="10"
          indeterminate
      ></v-progress-circular>
    </template>

    <div v-if="isLoaded">
      <v-img
          height="250"
          :src="track.coverUrl"
      ></v-img>

      <v-card-title>{{ this.track.title }}</v-card-title>
      <v-card-subtitle align=start>{{ this.track.author }}</v-card-subtitle>

      <v-item-group tile group>
        <v-btn fab dark @click="previous" :disabled="index < 1" class="green accent-3">
          <v-icon>
            mdi-arrow-left
          </v-icon>
        </v-btn>
        <v-btn x-large fab dark v-show="play" @click="playPause" class="green accent-2">
          <v-icon x-large>
            mdi-pause
          </v-icon>
        </v-btn>
        <v-btn x-large fab dark v-show="!play" @click="playPause" class="green accent-2">
          <v-icon x-large>
            mdi-play-outline
          </v-icon>
        </v-btn>
        <v-btn fab dark @click="next" :disabled="pendingList.length === index+1" class="green accent-3">
          <v-icon>
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </v-item-group>

      <v-slider
          v-model="this.currentTime"
          :max="(this.audio.duration ? this.audio.duration : 100)"
          color="green accent-3"
          track-color="grey lighten-2"
          min="0"
          thumb-label="always"
          @end="setPosition"
          class="my-10 mx-4">

        <template v-slot:thumb-label="{ value }">
          {{ Math.floor(value / 60) + ':' + (value - Math.floor(value / 60) * 60) }}
        </template>

      </v-slider>

      <v-speed-dial
          top
          left
          direction="bottom"
          transition="slide-y-transition"
      >
        <template v-slot:activator>
          <v-btn
              color="green accent-3"
              dark
              fab
              x-small
          >
            <v-icon>
              {{ volumeIcone }}
            </v-icon>
          </v-btn>
        </template>
        <v-slider
            v-model="volume"
            vertical
            max="1"
            min="0"
            step="0.1"
            color="green accent-3"
            track-color="green accent-2"
        ></v-slider>
      </v-speed-dial>

    </div>

  </v-card>
</template>

<script>
export default {
  name: "Player",
  data: () => ({
    play: false,
    index: 0,
    currentTime: 0,
    audio: null,
    isLoaded: false,
    track: {
      id: 0,
      title: "Jungle",
      author: "Petit biscuit",
      trackUrl: "./tracks/01.mp3",
      coverUrl: "https://lesoreillescurieuses.files.wordpress.com/2017/11/305c0689dfabd3120202ed3e5fbc7b13-1000x1000x1.jpg?w=700"
    },
    volumeIcone: "mdi-volume-medium",
    volume: 0.3
  }),
  methods: {
    playPause() {
      this.play = !this.play;

      if (this.play === false) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
    },
    previous() {
      this.index--;
      this.selectTrack(this.index);
    },
    next() {
      this.index++;
      this.selectTrack(this.index);
    },
    async loadTrack(index) {
      let id = this.pendingList[index];
      /*let response = await axios.get(`${API_ENDPOINT}/tracks/${id}`);
      this.track = response.data;*/
      this.track = this.db.tracks[id];
      this.index = index;
      this.$store.commit('setTrack', this.track);
      this.audio = new Audio(this.track.trackUrl);
      this.audio.volume = 0.3;
      this.audio.addEventListener('timeupdate', this.setProgressBar);
      this.audio.addEventListener('ended', this.next);
    },
    async selectTrack(index) {
      // Stop la musique
      this.play = false;
      this.audio.pause();
      this.isLoaded = false;
      // Change le track
      await this.loadTrack(index)
      this.isLoaded = true;
      // Lance la musique
      this.play = true;
      this.audio.play();
    },
    async changeTrack(index) {
      let id = this.pendingList.indexOf(index);
      // Stop la musique
      this.play = false;
      this.audio.pause();
      this.isLoaded = false;
      // Change le track
      await this.loadTrack(id)
      this.isLoaded = true;
      // Lance la musique
      this.play = true;
      this.audio.play();
    },
    setProgressBar() {
      this.currentTime = Math.floor(this.audio.currentTime);
    },
    setPosition(number) {
      this.audio.pause();
      this.audio.currentTime = number;
      this.audio.play();
    }
  },
  computed: {
    change() {
      return this.$store.state.change;
    },
    pendingList() {
      return this.$store.state.pending;
    },
    db() {
      return this.$store.state.db
    }
  },
  watch: {
    change: {
      deep: true,
      handler: function (id) {
        this.changeTrack(id);
      }
    },
    volume (value) {
      this.audio.volume = value;
      if (value === 0) {
        this.volumeIcone = "mdi-volume-off";
      } else if (0 < value <= 0.5) {
        this.volumeIcone = "mdi-volume-medium";
      } else if (0.5 < value <= 1) {
        this.volumeIcone = "mdi-volume-high";
      }
    }
  },
  created() {
    this.loadTrack(this.index);
    this.isLoaded = true
  },
}
</script>

<style scoped>
.v-speed-dial {
  position: absolute;
}
</style>