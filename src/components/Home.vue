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

    <v-text-field
        v-model="search"
        solo
        label="Chercher un titre"
        clearable
    ></v-text-field>
    <v-list
        align="start">
      <template v-for="(result, index) in results">

        <v-divider :key="index"></v-divider>

        <v-list-item :key="result.title" :class="(result.id != currentTrack.id) ? '': 'deep-orange lighten-3'">

          <v-list-item-avatar>
            <v-img :src="result.coverUrl"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="result.title"></v-list-item-title>
            <v-list-item-subtitle v-html="result.author"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="openModal(result.id)">
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
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>


  </v-card>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    isLoaded: true,
    search: null,
    results: [],
    dialog: false,
  }),
  methods: {
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
    }
  },
  computed: {
    currentTrack() {
      return this.$store.state.track
    },
    db(){
      return this.$store.state.db
    }
  },
  watch: {
    async search(value) {
      /*let response = await axios.get(API_ENDPOINT + '/tracks?q=' + value);
      this.results = response.data;*/
      let tracks = this.db.tracks;
      this.results = tracks.filter(track => {
        return track.title.toLowerCase().search(value) === 0;
      })
    }
  }
}
</script>

<style>

</style>