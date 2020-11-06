<template>
  <v-card
    align="center"
    :loading="!isLoaded"
  >

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

        <v-card-title>{{this.track.title }}</v-card-title>
        <v-card-subtitle align=start>{{this.track.author}}</v-card-subtitle>

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
                <v-icon x-large >
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
                {{ Math.floor(value/60)+':'+(value-Math.floor(value/60)*60) }}
            </template>

        </v-slider>
    </div>

  </v-card>
</template>

<script>
import axios from 'axios';

const API_ENDPOINT = "http://localhost:3000";

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
        }
    }),
    methods: {
        playPause() {
            this.play = !this.play;

            if(this.play === false) {
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
            let response = await axios.get(`${API_ENDPOINT}/tracks/${id}`);
            this.index = index;
            this.track = response.data;
            this.$store.commit('setTrack', this.track);
            this.audio = new Audio(this.track.trackUrl);
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
            // TODO : FIx ressource missing error
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
        change () {
            return this.$store.state.change;
        },
        pendingList () {
            return this.$store.state.pending;
        }
    },
    watch: {
        change: {
            deep: true,
            handler: function(id) {
                this.changeTrack(id);
            }
        }
    },
    created() {
        this.loadTrack(this.index);
        this.isLoaded = true
    },
}
</script>

<style>

</style>