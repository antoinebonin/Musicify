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
      <v-subheader>Titres favoris</v-subheader>
      <template v-for="(id, index) in LikedTrack">

        <v-divider :key="index"></v-divider>

        <v-list-item :key="tracks[id].title" :class="(tracks[id].id != currentTrack.id) ? '': 'deep-orange lighten-3'">

          <v-list-item-avatar>
            <v-img :src="tracks[id].coverUrl"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="tracks[id].title"></v-list-item-title>
            <v-list-item-subtitle v-html="tracks[id].author"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="openModal(tracks[id], index)">
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
              <v-list-item @click="deleteLiked">
                <v-list-item-icon>
                  <v-icon>mdi-heart-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Supprimer de mes titres favoris</v-list-item-title>
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
  name: 'Liked',
  data: () => ({
    tracks: null,
    dialog: false,
    selected: null,
    isLoaded: false,
    liked_title: []
  }),
  computed: {
    currentTrack() {
      return this.$store.state.track
    },
    LikedTrack() {
      return this.$store.state.liked
    },
    db() {
      return this.$store.state.db
    }
  },
  methods: {
    async fetchTracks() {
      /*let response = await axios.get(API_ENDPOINT + '/tracks');
      this.tracks = response.data;*/
      this.tracks = this.db.tracks;
      this.isLoaded = true;
    },
    openModal(track, index) {
      this.selected = {id: track.id, index: index};
      this.dialog = true;
    },
    selectTrack() {
      this.$store.dispatch('changeTrack', this.selected.id);
      this.dialog = false;
    },
    addPending() {
      this.$store.commit('addTrack', this.selected.id);
      this.dialog = false;
    },
    deleteLiked() {
      this.$store.commit('deleteLikedTrack', this.selected.index);
      this.dialog = false;
    }
  },
  mounted() {
    this.fetchTracks();
  }
}
</script>

<style>

</style>