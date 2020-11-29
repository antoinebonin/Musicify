<template>
  <v-card
      align="center"
      class="elevation-0"
      :loading="!isLoaded">

    <template slot="progress">
      <v-progress-circular
          color="green accent-3"
          size="100"
          width="10"
          indeterminate
      ></v-progress-circular>
    </template>

    <v-list
        align="start">
      <v-subheader>Titres de l'artiste :</v-subheader>
      <template v-for="(track, index) in tracks">

        <v-divider :key="index"></v-divider>

        <v-list-item :key="track.title" :class="(track.id != currentTrack.id) ? '': 'deep-orange lighten-3'">

          <v-list-item-avatar>
            <v-img :src="track.coverUrl"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="track.title"></v-list-item-title>
            <v-list-item-subtitle v-html="track.author"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="openModal(track.id)">
              <v-icon color="grey lighten-1">mdi-dots-horizontal-circle-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

      </template>
    </v-list>

    <v-dialog
        v-model="dialog"
        max-width="350"
    >
      <v-card>
        <v-card-title class="headline">
          Actions
        </v-card-title>

        <v-card-text>
          <v-list dense>
            <v-list-item-group>
              <v-list-item @click="selectTrack">
                <v-list-item-icon>
                  <v-icon>mdi-play-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Lire</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="addPending">
                <v-list-item-icon>
                  <v-icon>mdi-plus-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Ajouter à la liste de lecture</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="addLiked">
                <v-list-item-icon>
                  <v-icon>mdi-heart-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Ajouter à mes titres favoris</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-card>
</template>

<script>
export default {
  name: "Artist",
  data: () => ({
    tracks: null,
    isLoaded: false,
    dialog: false,
  }),
  computed: {
    currentTrack() {
      return this.$store.state.track
    },
    db() {
      return this.$store.state.db
    }
  },
  methods: {
    async fetchTracks(id) {
      /*let response = await axios.get(API_ENDPOINT + '/tracks?artisetId=' + id);
      this.tracks = response.data;*/
      let tracks = this.db.tracks;
      this.tracks = tracks.filter(track => {
        return track.artisteId == id;
      });
      this.isLoaded = true;
    },
    openModal(id) {
      this.selected = id;
      this.dialog = true;
    },
    selectTrack() {
      this.$store.dispatch('changeTrack', this.selected);
      this.dialog = false;
    },
    addPending() {
      this.$store.commit('addTrack', this.selected);
      this.dialog = false;
    },
    addLiked() {
      this.$store.commit('addLikedTrack', this.selected);
      this.dialog = false;
    }
  },
  created() {
    this.fetchTracks(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>